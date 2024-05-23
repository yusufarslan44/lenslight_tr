const { createUser, loginController, getDashboard, getAllUser, getAuser, follow, unfollow } = require('../controller/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = require('express').Router();


router.post('/register', createUser)
router.post('/login', loginController)
router.get('/dashboard', authenticateToken, getDashboard)
router.get('/', authenticateToken, getAllUser)
router.get('/:id', authenticateToken, getAuser)
router.put('/:id/follow', authenticateToken, follow)
router.put('/:id/unfollow', authenticateToken, unfollow)

module.exports = router