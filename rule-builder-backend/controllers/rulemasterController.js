import RuleMaster from "../models/Rule_Master.js";

export const getALLRule = async (req, res) => {
    try {
        const data = await RuleMaster.findAll();

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

export const getRuleByID = async (req, res) => {
    try {

        const { rulenumber } = req.params;

        const data = await RuleMaster.findByPk(rulenumber)

        if (!data) {
            return res.status(404).json({message:'Rule not found'});
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};