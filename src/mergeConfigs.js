
const mergeTypes = (...types) => types.reduce((acc, type) => {
  if (type.actionHandlers) {
    acc.actionHandlers = Object.assign({}, acc.actionHandlers, type.actionHandlers);
  }
  if (type.actionCreators) {
    acc.actionCreators = Object.assign({}, acc.actionCreators, type.actionCreators);
  }

  return acc;
}, { actionHandlers: {}, actionCreators: {} });


const mergeConfigs = (...configs) => configs.reduce((accConfig, config) => {
  Object.keys(config).forEach((key) => {
    if (accConfig[key]) {
      accConfig[key] = mergeTypes(accConfig[key], config[key]);
    } else {
      accConfig[key] = config[key];
    }
  });
  return accConfig;
}, {});


module.exports = mergeConfigs;
