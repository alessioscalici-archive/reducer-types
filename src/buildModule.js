const buildModuleReducer = require('./buildModuleReducer');
const buildModuleActions = require('./buildModuleActions');
const buildModuleSelectors = require('./buildModuleSelectors');


const buildModule = config => model => (path = []) => ({
  selectors: buildModuleSelectors(model)(path),
  reducer: buildModuleReducer(config)(model)(path),
  actions: buildModuleActions(config)(model)(path),
});


module.exports = buildModule;
