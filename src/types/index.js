

const arrayType = require('./array');
const objectType = require('./object');
const numberType = require('./number');
const booleanType = require('./boolean');
const stringType = require('./string');


const initTypeDescriptors = require('../initTypeDescriptors');
const buildModule = require('../buildModule');
const buildModuleActions = require('../buildModuleActions');
const buildModuleReducer = require('../buildModuleReducer');
const buildModuleSelectors = require('../buildModuleSelectors');


const CONFIG = {
  array: arrayType,
  object: objectType,
  boolean: booleanType,
  number: numberType,
  string: stringType,
};


module.exports = {
  CONFIG,
  type: initTypeDescriptors(CONFIG),
  buildModule: buildModule(CONFIG),
  buildModuleActions: buildModuleActions(CONFIG),
  buildModuleReducer: buildModuleReducer(CONFIG),
  buildModuleSelectors,
};
