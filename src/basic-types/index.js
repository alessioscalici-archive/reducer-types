const {
  TYPE_STRING,
  TYPE_NUMBER,
  TYPE_BOOLEAN,
  TYPE_OBJECT,
  TYPE_ARRAY,
} = require('./const');

const arrayType = require('./array');
const objectType = require('./object');
const numberType = require('./number');
const booleanType = require('./boolean');
const stringType = require('./string');


const initTypeDescriptors = require('../initTypeDescriptors');
const buildModule = require('../buildModule');


const CONFIG = {
  [TYPE_ARRAY]: arrayType,
  [TYPE_OBJECT]: objectType,
  [TYPE_BOOLEAN]: booleanType,
  [TYPE_NUMBER]: numberType,
  [TYPE_STRING]: stringType,
};


module.exports = {
  CONFIG,
  type: initTypeDescriptors(CONFIG),
  buildModule: buildModule(CONFIG),
};
