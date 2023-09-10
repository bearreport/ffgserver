const httpStatus = require('http-status');
const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { sheetdefinitionService } = require('../services');
// const logger = require('../config/logger');

const createSheetdefinition = catchAsync(async (req, res) => {
  const sheetdefinition = await sheetdefinitionService.createSheetdefinition(req.body);
  res.status(httpStatus.CREATED).send(sheetdefinition);
});

const getSheetdefinitions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await sheetdefinitionService.querySheetdefinitions(filter, options);
  res.send(result);
});

const getAllSheetDefinitions = catchAsync(async (req, res) => {
  const result = await sheetdefinitionService.getAllSheetDefinitions();
  res.send(result);
});

module.exports = {
  createSheetdefinition,
  getSheetdefinitions,
  getAllSheetDefinitions,
};
