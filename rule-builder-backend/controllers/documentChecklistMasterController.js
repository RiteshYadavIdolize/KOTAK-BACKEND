import DocumentChecklistMaster from "../models/Document_Checklist_Master.js";
import DocumentFieldRegistry from "../models/Document_Field_Registry.js";

export const getALLDocuments = async (req, res) => {
    try {
        const data = await DocumentChecklistMaster.findAll();

        res.status(200).json({
            success:true,
            data: data
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: 'Error fetching data',
            error: error.message
        });
    }
};

export const getDocumentById = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await DocumentChecklistMaster.findByPk(id);

        if (!data) {
            return res.status(404).json({message:'Not found'});
        }
                
        res.json(data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

export const getDocumentFields = async (req, res) => {
    try {
        const { id } = req.params;

        // FIXED: Changed DocumentField to DocumentFieldRegistry to match your import!
        const fields = await DocumentFieldRegistry.findAll({
            where: {
                Document_ID: id // Make sure this exactly matches the column name in your DB
            },
            attributes: ['id', 'Field_Name', 'Field_Description', 'Field_Column_Name'] 
        });

        res.status(200).json({
            success: true,
            data: fields
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching document fields',
            error: error.message
        });
    }
};