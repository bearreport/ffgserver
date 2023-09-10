const express = require('express');
const sheetdefinitionController = require('../../controllers/sheetdefinition.controller');

const router = express.Router();

router.route('/').get(sheetdefinitionController.getAllSheetDefinitions);

module.exports = router;
