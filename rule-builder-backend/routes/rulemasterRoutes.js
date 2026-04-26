import express from 'express'
import { getALLRule, getRuleByID } from '../controllers/rulemasterController.js'

const router = express.Router()

router.get('/rulemaster', getALLRule)

router.get('/rulemaster/:rulenumber', getRuleByID)

// router.get('/rulemaster/')

export default router;