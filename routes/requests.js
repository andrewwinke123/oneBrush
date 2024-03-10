import { Router } from 'express'
import * as requestsCtrl from '../controllers/requests.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
router.get('/', checkAuth, requestsCtrl.index)
router.get('/:requestId', checkAuth, requestsCtrl.show)
router.post('/', checkAuth, requestsCtrl.create)
router.post('/:requestId/comments', checkAuth, requestsCtrl.createComment)
router.put('/:requestId', checkAuth, requestsCtrl.update)
router.delete('/:requestId', checkAuth, requestsCtrl.delete)


export { router }