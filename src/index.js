const {
  createCustomCreateReducer,
  generateBindActions,
} = require('./redules');
const generateTypeDescriptors = require('./generateTypeDescriptors');
const { getTreeReducer, getActionsTree } = require('./treeDescriptorMethods');


module.exports = {
  generateTypeDescriptors,
  getTreeReducer,
  getActionsTree,
  createCustomCreateReducer,
  generateBindActions,
};
