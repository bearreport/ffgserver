/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable security/detect-eval-with-expression */
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');
const logger = require('../config/logger');
const Sheetdefinition = require('../models/sheetdefinition.model');

async function globby() {
  const files = await glob('**/*', { cwd: 'assets/spritesheets' });
  let renamed = [];
  renamed = files.map((f) => f.replaceAll('/', '_'));
  return renamed;
}

async function checkAndPopulateCollection() {
  Sheetdefinition.createCollection();
  Sheetdefinition.collection.drop();

  try {
    // Define your default JSON data
    const sheetDefinitionDirectory = path.join(__dirname, '../../assets/sheet_definitions');
    const files = fs.readdirSync(sheetDefinitionDirectory);
    const renamed = await globby();
    logger.info(renamed.length > 0);

    files.forEach((file) => {
      if (file.endsWith('.json')) {
        const filePath = path.join(sheetDefinitionDirectory, file);
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const obj = JSON.parse(jsonData);
        obj.filename = file.substring(0, file.length - 5);
        obj.filepath = 'we will get there';
        Sheetdefinition.insertMany(obj);
      }
    });
  } catch (err) {
    logger.info('Error checking/populating collection:', err);
  }
}

module.exports = checkAndPopulateCollection;
