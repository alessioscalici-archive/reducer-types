const { ACTION_TYPE_COMPOSE } = require('./lib/actions');
const mergeConfigs = require('./lib/mergeConfigs');


const generateHandleAction = typeConfig => type => (state, action) => (
  typeConfig[type].actionHandlers[action.type]
    ? typeConfig[type].actionHandlers[action.type](state, action)
    : state
);


const getReducerFactory = (actionHandler, initialValue) => targetId => (
  (state = initialValue, action) => {
    if (!action) {
      return state;
    }
    if (action.type === ACTION_TYPE_COMPOSE && action.payload.actionsMap[targetId]) {
      return action.payload.actionsMap[targetId].reduce(actionHandler, state);
    }
    if (!action.meta || action.meta.targetId !== targetId) {
      return state;
    }
    return actionHandler(state, action);
  }
);

const initReducerFactory = (...typeConfigs) => {
  const typeConfig = mergeConfigs(...typeConfigs);
  const getActionHandlerForType = generateHandleAction(typeConfig);
  return (type, initialValue = null) => {
    if (!typeConfig[type]) {
      throw new Error(`Type "${type}" is not supported!`);
    }
    return getReducerFactory(
      getActionHandlerForType(type),
      initialValue,
    );
  };
};

module.exports = initReducerFactory;
