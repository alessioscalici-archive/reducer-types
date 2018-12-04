const initActionDecoratorFactory = require('./initActionDecoratorFactory');


const buildActions = bindActionsFunc => descr => (path = []) => {
  if (descr.isLeaf) {
    const id = path.join('.');
    return bindActionsFunc(descr.type)(id);
  }
  const getActions = buildActions(bindActionsFunc);
  return Object.keys(descr).reduce((acc, key) => {
    acc[key] = getActions(descr[key])([...path, key]);
    return acc;
  }, {});
};


const buildModuleActions = config => model => (path = []) => (
  buildActions(initActionDecoratorFactory(config))(model)(path)
);


module.exports = buildModuleActions;
