import express from 'express'
import { getALLDocuments, getDocumentById , getDocumentFields} from '../controllers/documentChecklistMasterController.js'

const router = express.Router();

// API Endpoint
router.get('/', getALLDocuments);

router.get('/:id', getDocumentById);

router.get('/:id/fields', getDocumentFields);

export default router;