const { ACTION_TYPE_COMPOSE } = require('./actions');
const mergeConfigs = require('./mergeConfigs');


const generateHandleAction = typeConfig => type => (state, action, typeParams) => (
  typeConfig[type].actionHandlers[action.type]
    ? typeConfig[type].actionHandlers[action.type](state, action, typeParams)
    : state
);


const getReducerFactory = (actionHandler, initialValue, typeParams) => targetId => (
  (state = initialValue, action) => {
    if (!action) {
      return state;
    }
    if (action.type === ACTION_TYPE_COMPOSE && action.payload.actionsMap[targetId]) {
      return action.payload.actionsMap[targetId]
        .reduce((accState, act) => actionHandler(accState, act, typeParams), state);
    }
    if (!action.meta || action.meta.targetId !== targetId) {
      return state;
    }
    return actionHandler(state, action, typeParams);
  }
);

const initReducerFactory = (...typeConfigs) => {
  const typeConfig = mergeConfigs(...typeConfigs);
  const getActionHandlerForType = generateHandleAction(typeConfig);
  return (type, initialValue = null, typeParams) => {
    if (!typeConfig[type]) {
      throw new Error(`Type "${type}" is not supported!`);
    }
    return getReducerFactory(
      getActionHandlerForType(type),
      initialValue,
      typeParams,
    );
  };
};

module.exports = initReducerFactory;
