

const mergeConfigs = require('./lib/mergeConfigs');
const actionDecoratorFactory = require('./lib/actionDecoratorFactory');


const initActionDecoratorFactory = (...typeConfigs) => type => (targetId) => {
  const typeConfig = mergeConfigs(...typeConfigs);

  if (typeConfig[type] && typeConfig[type].actionCreators) {
    const decorateActionCreator = actionDecoratorFactory(targetId);
    return Object.keys(typeConfig[type].actionCreators).reduce((acc, key) => {
      acc[key] = decorateActionCreator(typeConfig[type].actionCreators[key]);
      return acc;
    }, {});
  }
  return {};
};


module.exports = initActionDecoratorFactory;
