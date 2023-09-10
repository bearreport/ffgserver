/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-eval-with-expression */
const fs = require('fs');
const path = require('path');

const logger = require('../config/logger');
const Sheetdefinition = require('../models/sheetdefinition.model');

// Function to check if the collection is empty and populate it if needed
async function checkAndPopulateCollection() {
  Sheetdefinition.collection.drop();
  try {
    // const count = await SheetDefinition.countDocuments({});

    // fires everytime now for debugging purposes
    // if (count || !count)

    // Define your default JSON data
    const sheetDefinitionDirectory = path.join(__dirname, '../../assets/sheet_definitions');
    const files = fs.readdirSync(sheetDefinitionDirectory);

    files.forEach((file) => {
      if (file.endsWith('.json')) {
        const filePath = path.join(sheetDefinitionDirectory, file);
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const obj = JSON.parse(jsonData);
        obj.filename = file.substring(0, file.length - 5);
        Sheetdefinition.insertMany(obj);
      }
    });
  } catch (err) {
    logger.info('Error checking/populating collection:', err);
  }
}

module.exports = checkAndPopulateCollection;
