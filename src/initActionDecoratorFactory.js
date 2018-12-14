const actionDecoratorFactory = require('./lib/actionDecoratorFactory');


const initActionDecoratorFactory = (typeConfig = {}) => type => (targetId) => {
  if (typeConfig[type]) {
    const decorateActionCreator = actionDecoratorFactory(targetId);
    return Object.keys(typeConfig[type]).reduce((acc, key) => {
      acc[key] = decorateActionCreator(typeConfig[type][key].creator);
      return acc;
    }, {});
  }
  return {};
};


module.exports = initActionDecoratorFactory;
