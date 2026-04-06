const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({origin: process.env.CORS_ORIGIN}));
app.use(express.json());

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};


const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server (KOTAK_POC)');
        return pool
    })
    .catch(err => console.error('Database Connection Failed! Bad Config: ', err));

// 1. Fetch Checklists
app.get('/api/checklists', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT Checklist_Number as id, Name as name 
            FROM [dbo].[Document_Checklist_Master]
        `);
        res.json({ checklists: result.recordset });
    } catch (err) {
        console.error("Error fetching checklists:", err);
        res.status(500).json({ detail: err.message });
    }
});

// 2. Create a New Rule
app.post('/api/rules', async (req, res) => {
    try {
        const { 
            checklist_no, 
            rule_number, 
            source_1, 
            match_operator, 
            source_2, 
            rule_description 
        } = req.body;

        const pool = await poolPromise;
        
        // We use .input() to prevent SQL Injection
        await pool.request()
            .input('Checklist_Sr_No', sql.VarChar, checklist_no)
            .input('Rule_Number', sql.VarChar, rule_number)
            .input('Source_1', sql.VarChar, source_1)
            .input('Match_Operator', sql.VarChar, match_operator)
            .input('Source_2', sql.VarChar, source_2)
            .input('Rule_Description', sql.VarChar, rule_description)
            .input('Status', sql.VarChar, 'Active')
            .query(`
                INSERT INTO [dbo].[Rule_Master] 
                (Checklist_Sr_No, Rule_Number, Source_1, Match_Operator, Source_2, Rule_Description, Status)
                VALUES 
                (@Checklist_Sr_No, @Rule_Number, @Source_1, @Match_Operator, @Source_2, @Rule_Description, @Status)
            `);

        res.status(201).json({ message: "Rule created successfully!", rule_number });
    } catch (err) {
        console.error("Error creating rule:", err);
        res.status(500).json({ detail: err.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});