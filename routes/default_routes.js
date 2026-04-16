const router = require('express').Router();
const controller = require('../controller/default_controller');

router.get('/', controller.index);
router.get('/veiledning', controller.veiLedning);

module.exports = router;
