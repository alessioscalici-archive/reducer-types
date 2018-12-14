const { ACTION_TYPE_COMPOSE } = require('./lib/actions');


const generateHandleAction = actionHandlersMap => type => (state, action) => (
  actionHandlersMap[type] && actionHandlersMap[type][action.type]
    ? actionHandlersMap[type][action.type](state, action)
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

/* eslint-disable no-param-reassign */
const getActionHandlersMap = typeConfig => Object.keys(typeConfig)
  .reduce((typeSetAcc, typeName) => {
    typeSetAcc[typeName] = Object.keys(typeConfig[typeName]).reduce((typeAcc, actionName) => {
      typeAcc[typeConfig[typeName][actionName].type] = typeConfig[typeName][actionName].handler;
      return typeAcc;
    }, {});
    return typeSetAcc;
  }, {});
/* eslint-enable no-param-reassign */

const initReducerFactory = (typeConfig) => {
  const actionHandlersMap = getActionHandlersMap(typeConfig);
  const getActionHandlerForType = generateHandleAction(actionHandlersMap);
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
