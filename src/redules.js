

const { ACTION_TYPE_COMPOSE, compose } = require('./actions');
const mergeConfigs = require('./mergeConfigs');
const generateDecorateActionCreator = require('./generateDecorateActionCreator');



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

    const generateSpecificHandleAction = generateHandleAction(typeConfig);

    return (type, initialValue = null) => {
        if (!typeConfig[type]) {
            throw new Error(`Type "${type}" is not supported!`);
        }
        const handleAction = generateSpecificHandleAction(type);

        return generateCreateReducer(handleAction, initialValue);
    };

};


const generateBindActions = (...typeConfigs) => type => targetId => {

    const typeConfig = mergeConfigs(...typeConfigs);

    if (typeConfig[type] && typeConfig[type].actionCreators) {
      const decorateActionCreator = generateDecorateActionCreator(targetId);
      return Object.keys(typeConfig[type].actionCreators).reduce((acc, key) => {
          acc[key] = decorateActionCreator(typeConfig[type].actionCreators[key]);
          return acc;
      }, {});
    }
    return {};
};





module.exports = {
    generateBindActions,
    createCustomCreateReducer,
};
module.exports.default = module.exports;
