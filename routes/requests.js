import { Router } from 'express'
import * as requestsCtrl from '../controllers/requests.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.post('/', checkAuth, requestsCtrl.create)


export { router }