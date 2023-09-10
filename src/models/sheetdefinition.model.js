/* eslint-disable prettier/prettier */
// Sheetdefinition model

const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const LayerSchema = new mongoose.Schema({
  zPos: Number,
  male: String,
  muscular: String,
  female: String,
  pregnant: String,
  teen: String,
  child: String,
});

const SheetdefinitionSchema = mongoose.Schema({
  name: String,
  type_name: String,
  variants: [String],
  match_body_color: Boolean,
  filename: String,
  layer_1: LayerSchema,
  layer_2: LayerSchema,
  layer_3: LayerSchema,
  layer_4: LayerSchema,
  layer_5: LayerSchema,
  layer_6: LayerSchema,
  layer_7: LayerSchema,
  layer_8: LayerSchema,
});

// add plugin that converts mongoose to json
SheetdefinitionSchema.plugin(toJSON);
SheetdefinitionSchema.plugin(paginate);

/**
 * Check if stylingsheet name already is taken
 * @param {string} name - The user's email
 * @param {ObjectId} [excludeName] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
SheetdefinitionSchema.statics.isNameTaken = async function (name, excludeName) {
  const stylingsheet = await this.findOne({ name, _id: { $ne: excludeName } });
  return !!stylingsheet;
};

/**
 * @typedef Sheetdefinition
 */
const Sheetdefinition = mongoose.model('Sheetdefinition', SheetdefinitionSchema);

module.exports = Sheetdefinition;
