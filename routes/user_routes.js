const router = require('express').Router();
const controller = require('../controller/user_controller');
const { authenticate } = require('../middleware/auth');

router.get('/login', controller.login_get);
router.post('/login', controller.login_post);

router.get('/signup', controller.signup_get);
router.post('/signup', controller.signup_post);

router.get('/profile/:username', authenticate, controller.profile);

module.exports = router;
