const router = require('express').Router();
const controller = require('../controller/authorize_controller');
const { isAdmin, isRepresant } = require('../middleware/authorize');
const { authenticate } = require('../middleware/auth');

router.get('/admin', authenticate, isAdmin, controller.admin_page);

router.post('/admin', authenticate, isAdmin, controller.admin_post);

router.get(
  '/representant',
  authenticate,
  isRepresant,
  controller.represant_page,
);

module.exports = router;
