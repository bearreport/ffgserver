const httpStatus = require('http-status');
const { Sheetdefinition } = require('../models');
const ApiError = require('../utils/ApiError');
const checkAndPopulateCollection = require('../utils/populateDb');
const logger = require('../config/logger');

logger.info('dummy log');

/**
 * * Create a sheetdefinition
 * @param {Object} sheetdefinitionBody
 * @returns {Promise<Sheetdefinition>}
 */
const createSheetdefinition = async (sheetdefinitionBody) => {
  if (await Sheetdefinition.isNameTaken(sheetdefinitionBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return Sheetdefinition.create(sheetdefinitionBody);
};

const getAllSheetDefinitions = async () => {
  const sheetDefinitions = await Sheetdefinition.find({});
  return sheetDefinitions;
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

const querySheetDefinitions = async (filter, options) => {
  const sheetDefinitions = await Sheetdefinition.paginate(filter, options);
  return sheetDefinitions;
};

checkAndPopulateCollection();

module.exports = { createSheetdefinition, getAllSheetDefinitions, querySheetDefinitions };
