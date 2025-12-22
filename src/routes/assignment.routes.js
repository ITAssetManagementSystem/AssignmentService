const express = require('express');
const controller = require('../controllers/assignment.controller');

const router = express.Router();

router.post('/init-db', controller.initDb);
router.post('/', controller.assignAsset);
router.get('/employee/:employeeCode', controller.getByEmployee);
router.get('/asset/:assetId', controller.getByAsset);
router.get('/', controller.getAll);
router.post('/:id/return', controller.returnAsset);

module.exports = router;
