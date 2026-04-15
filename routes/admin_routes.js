const router = require('express').Router();
const controller = require('../controller/admin_controller');
const { isAdmin } = require('../middleware/adminCheck');
const { authenticate } = require('../middleware/auth');

router.get('/admin', authenticate, isAdmin, controller.admin_page);

module.exports = router;
