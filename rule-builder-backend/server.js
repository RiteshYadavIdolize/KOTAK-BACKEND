// server.js
import express from 'express'
import cors from 'cors' // <-- 1. Import CORS
import sequelize from './config/database.js'
import documentChecklistMasterRoutes from './routes/documentChecklistMasterRoutes.js'
import rulemasterRoutes from './routes/rulemasterRoutes.js'
import { logger } from './middleware/logger.js'

const app = express();

app.use(cors()); // <-- 2. Enable CORS so React can talk to Express
app.use(express.json());
app.use(logger);

app.use('/api/documents', documentChecklistMasterRoutes);
app.use('/api/rule', rulemasterRoutes);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected successfully');

        app.listen(3000, () => {
            console.log('🚀 Server running on port 3000');
        });
    } catch (error) {
        console.error('❌ Unable to connect to DB:', error);
    }
}

startServer();