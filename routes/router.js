const router = require('express').Router()
const defaultController = require('../controllers/defaultController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware.checkUser, defaultController.login_get)
router.get('/login', authMiddleware.checkUser, defaultController.login_get)
router.post('/login', defaultController.login_post)
router.get('/register', authMiddleware.checkUser, defaultController.register_get)
router.post('/register', defaultController.register_post)
router.get('/home', authMiddleware.requireAuth, authMiddleware.checkUser, defaultController.home_get)
router.get('/logout', defaultController.logout_get)
router.get('*', defaultController.error_404)

module.exports = router
