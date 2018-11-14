


const {
    ACTION_TYPE_SET, ACTION_TYPE_COMPOSE,
    set, compose,
} = require('./actions');




// ============ BINDING ============ //


const bindActionCreator = (targetId) => (actionCreator) => (...args) => {
    const action = actionCreator(...args);
    if (!action) return action;
    if (!action.meta) action.meta = {};
    action.meta.targetId = targetId;
    action.meta.reduxDebug = `${action.type}{${targetId}}`; // TODO: move descriptive text to action type
    return action;
};



// ============ TYPE CONFIG ============ //



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


const generateIsValidType = typeConfig => type => !!typeConfig[type];

const generateHandleAction = typeConfig => type => (state, action) => {
    return typeConfig[type].actionHandlers[action.type] ?
        typeConfig[type].actionHandlers[action.type](state, action) :
        state;
};


const generateCreateReducer = (defaultReducer, initialValue) => targetId => (state = initialValue, action) => {

    if (!action) return state;

    if (action.type === ACTION_TYPE_COMPOSE && action.payload.actionsMap[targetId]) {
        return action.payload.actionsMap[targetId].reduce(defaultReducer, state);
    }

    if (!action.meta || action.meta.targetId !== targetId) {
        return state;
    }

    return defaultReducer(state, action);
};

const createCustomCreateReducer = (...typeConfigs) => {

    const typeConfig = mergeConfigs(...typeConfigs);

    const isValidType = generateIsValidType(typeConfig);
    const generateSpecificHandleAction = generateHandleAction(typeConfig);

    return (type, initialValue = null) => {
        if (!isValidType(type)) {
            throw new Error(`Type "${type}" is not supported!`);
        }

        const handleAction = generateSpecificHandleAction(type);

        return generateCreateReducer(handleAction, initialValue);
    };

};



// ============ UTILS ============ //

const generateBindActions = (...typeConfigs) => type => targetId => {

    const typeConfig = mergeConfigs(...typeConfigs);

    if (typeConfig[type] && typeConfig[type].actionCreators) {
      const wrap = bindActionCreator(targetId);
      return Object.keys(typeConfig[type].actionCreators).reduce((acc, key) => {
          acc[key] = wrap(typeConfig[type].actionCreators[key]);
          return acc;
      }, { set: wrap(set) });
    }
    return {};
};

const generateTypeDescriptors = (...typeConfigs) => {
  const typeConfig = mergeConfigs(...typeConfigs);
  return Object.keys(typeConfig).reduce((acc, type) => {
    // TODO: add initialvalue type validation here
    acc[type] = initialValue => {
      return { type, initialValue, isLeaf: true };
    };
    return acc;
  }, {});
};




module.exports = {

    bindActionCreator, // TODO: rename

    generateBindActions,
    generateTypeDescriptors,

    createCustomCreateReducer,

    // utils
    mergeTypes,
    mergeConfigs,
};
module.exports.default = module.exports;
