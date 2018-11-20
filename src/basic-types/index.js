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

const {
  createCustomCreateReducer,
  generateBindActions,
} = require('../redules');

const generateTypeDescriptors = require('../generateTypeDescriptors');
const { getTreeReducer, getActionsTree } = require('../treeDescriptorMethods');


const CONFIG = {
  [TYPE_ARRAY]: arrayType,
  [TYPE_OBJECT]: objectType,
  [TYPE_BOOLEAN]: booleanType,
  [TYPE_NUMBER]: numberType,
  [TYPE_STRING]: stringType,
};


// default functions
const bindActions = generateBindActions(CONFIG);
const type = generateTypeDescriptors(CONFIG);
const createReducer = createCustomCreateReducer(CONFIG);


module.exports = {
  bindActions,
  type,
  createReducer,
  CONFIG,
  getTreeReducer: getTreeReducer(createReducer),
  getActionsTree: getActionsTree(bindActions),
};
