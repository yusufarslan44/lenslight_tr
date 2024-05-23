const router = require('express').Router();
const { home, about, register, login, logout, contact, sendMail } = require('../controller/pageController');



router.get('/', home)
router.get('/about', about)

router.get('/register', register)
router.get('/login', login)
router.get('/logout', logout)
router.get('/contact', contact)
router.post('/contact', sendMail)


module.exports = router