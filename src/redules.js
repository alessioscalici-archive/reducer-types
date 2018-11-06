
const {
    TYPE_STRING,
    TYPE_NUMBER,
    TYPE_BOOLEAN,
    TYPE_OBJECT,
    TYPE_ARRAY,
} = require('./types');



const {
    ACTION_TYPE_SET, ACTION_TYPE_COMPOSED, ACTION_TYPE_MULTIACTION,
    ACTION_TYPE_ENTRY, ACTION_TYPE_REMOVE,
    ACTION_TYPE_PUSH, ACTION_TYPE_POP, ACTION_TYPE_UNSHIFT, ACTION_TYPE_SHIFT, ACTION_TYPE_ADD, ACTION_TYPE_SUBTRACT,
    ACTION_TYPE_MULTIPLY, ACTION_TYPE_DIVIDE, ACTION_TYPE_MOD, ACTION_TYPE_NEGATE, ACTION_TYPE_BW_AND, ACTION_TYPE_BW_OR, ACTION_TYPE_BW_XOR,
    ACTION_TYPE_AND, ACTION_TYPE_OR, ACTION_TYPE_XOR, ACTION_TYPE_NOT,
    ACTION_TYPE_UPPERCASE, ACTION_TYPE_LOWERCASE,

    set, multiAction,
    entry, remove,
    push, pop, unshift, shift,
    add, subtract, multiply, divide, mod, negate, bitwiseAnd, bitwiseOr, bitwiseXor,
    and, or, xor, not,
    uppercase, lowercase,
} = require('./actions');




const ahEntry = (state, action) => {
  const { key, value } = action.payload;
  return (!state || state[key] === value) ? state : { ...state, [key]: value };
};
const ahRemove = (state, action) => {
  if (!state || !state.hasOwnProperty(action.payload.key)) {
    return state;
  }
  const { [action.payload.key]: val, ...res } = state;
  return res;
};

// Array
const ahPush = (state, action) => (state && Array.isArray(state) ? [ ...state, action.payload.value ] : state);
const ahUnshift = (state, action) => (state && Array.isArray(state) ? [ action.payload.value, ...state ] : state);
const ahPop = state => state && Array.isArray(state) ? state.slice(0, state.length-1) : state;
const ahShift = state => state && Array.isArray(state) ? state.slice(1) : state;

// FIXME number can be null
// Number
const ahAdd = (state, action) => state + action.payload.value;
const ahSubtract = (state, action) => state - action.payload.value;
const ahMultiply = (state, action) => state * action.payload.value;
const ahDivide = (state, action) => state / action.payload.value;
const ahMod = (state, action) => state % action.payload.value;
const ahNegate = state => -state;
const ahBwAnd = (state, action) => state & action.payload.value;
const ahBwOr = (state, action) => state | action.payload.value;
const ahBwXor = (state, action) => state ^ action.payload.value;

// Boolean
const ahAnd = (state, action) => (state === null ? state : state && action.payload.value);
const ahOr = (state, action) => (state === null ? state : state || action.payload.value);
const ahXor = (state, action) => (state === null ? state : (action.payload.value ? !state : state));
const ahNot = state => (state === null ? state : !state);

// String
const ahUppercase = state => state && state.toUpperCase();
const ahLowercase = state => state && state.toLowerCase();



// ============ BINDING ============ //


const bindActionCreator = (targetId) => (actionCreator) => (...args) => {
    const action = actionCreator(...args);
    if (!action) return action;
    if (!action.meta) action.meta = {};
    action.meta.targetId = targetId;
    action.meta.reduxDebug = `${action.type}{${targetId}}`; // TODO: move descriptive text to action type
    return action;
};



// ============ TYPE CHECK ============ //

const isNullOrArray = val => (val === null || Array.isArray(val));
const isNullOrObject = val => (val === null || (typeof val === TYPE_OBJECT && val.constructor === Object));
const isNullOrBoolean = val => (val === null || typeof val === TYPE_BOOLEAN);
const isNullOrNumber = val => (val === null || (typeof val === TYPE_NUMBER && val !== NaN));
const isNullOrString = val => (val === null || typeof val === TYPE_STRING);





// ============ TYPE CONFIG ============ //

const DEFAULT_CONFIG = {
  [TYPE_ARRAY]: {
    validate: isNullOrArray,
    actionHandlers: {
      [ACTION_TYPE_PUSH]: ahPush,
      [ACTION_TYPE_UNSHIFT]: ahUnshift,
      [ACTION_TYPE_POP]: ahPop,
      [ACTION_TYPE_SHIFT]: ahShift,
    },
    actionCreators: { set, push, pop, unshift, shift },
  },
  [TYPE_OBJECT]: {
    validate: isNullOrObject,
    actionHandlers: {
      [ACTION_TYPE_ENTRY]: ahEntry,
      [ACTION_TYPE_REMOVE]: ahRemove,
    },
    actionCreators: { set, entry, remove },
  },
  [TYPE_BOOLEAN]: {
    validate: isNullOrBoolean,
    actionHandlers: {
      [ACTION_TYPE_AND]: ahAnd,
      [ACTION_TYPE_OR]: ahOr,
      [ACTION_TYPE_XOR]: ahXor,
      [ACTION_TYPE_NOT]: ahNot,
    },
    actionCreators: { set, and, or, xor, not },
  },
  [TYPE_NUMBER]: {
    validate: isNullOrNumber,
    actionHandlers: {
      [ACTION_TYPE_ADD]: ahAdd,
      [ACTION_TYPE_SUBTRACT]: ahSubtract,
      [ACTION_TYPE_MULTIPLY]: ahMultiply,
      [ACTION_TYPE_DIVIDE]: ahDivide,
      [ACTION_TYPE_MOD]: ahMod,
      [ACTION_TYPE_NEGATE]: ahNegate,
      [ACTION_TYPE_BW_AND]: ahBwAnd,
      [ACTION_TYPE_BW_OR]: ahBwOr,
      [ACTION_TYPE_BW_XOR]: ahBwXor,
    },
    actionCreators: { set, add, subtract, multiply, divide, mod, negate, bitwiseAnd, bitwiseOr, bitwiseXor },
  },
  [TYPE_STRING]: {
    validate: isNullOrString,
    actionHandlers: {
      [ACTION_TYPE_UPPERCASE]: ahUppercase,
      [ACTION_TYPE_LOWERCASE]: ahLowercase,
    },
    actionCreators: { set, uppercase, lowercase },
  },
};


const mergeTypes = (...types) => types.reduce((acc, type) => {
  if (type.validate) {
    acc.validate = type.validate;
  }
  if (type.actionHandlers)
  acc.actionHandlers = Object.assign({}, acc.actionHandlers, type.actionHandlers);
  acc.actionCreators = Object.assign({}, acc.actionCreators, type.actionCreators);
  return acc;
}, { validate: () => true, actionHandlers: {}, actionCreators: {} });


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
const generateValidate = typeConfig => type => typeConfig[type].validate;
const generateHandleAction = typeConfig => type => (state, action) => {
    return typeConfig[type].actionHandlers[action.type] ?
        typeConfig[type].actionHandlers[action.type](state, action) :
        state;
};

// ((any -> boolean), ((A, FSA) -> A)) -> (A, FSA) -> A)
const generateDefaultReducer = (validate, handleAction) => (state, action) => {
    if (action.type === ACTION_TYPE_SET) {
        if (validate(action.payload.value)) {
            return action.payload.value;
        } else {
            // FIXME: effect!
            console.warn(`${action.meta.reduxDebug}: Value ${action.payload.value} is not a valid "${type}" value`);
        }
    }
    return handleAction(state, action);
};


const generateCreateReducer = (defaultReducer, initialValue) => targetId => (state = initialValue, action) => {

    if (!action) return state;

    if (action.type === ACTION_TYPE_MULTIACTION && action.payload.actionsMap[targetId]) {
        return action.payload.actionsMap[targetId].reduce(defaultReducer, state);
    }

    if (!action.meta || action.meta.targetId !== targetId) {
        return state;
    }

    return defaultReducer(state, action);
};

const createCustomCreateReducer = (typeConfig = DEFAULT_CONFIG) => {

    if (typeConfig !== DEFAULT_CONFIG) {
        typeConfig = mergeConfigs(DEFAULT_CONFIG, typeConfig);
    }

    const isValidType = generateIsValidType(typeConfig);
    const generateSpecificValidate = generateValidate(typeConfig);
    const generateSpecificHandleAction = generateHandleAction(typeConfig);

    return (type, initialValue = null) => {
        if (!isValidType(type)) {
            throw new Error(`Type "${type}" is not supported!`);
        }

        const validate = generateSpecificValidate(type);

        // check the type of the initial value
        if (!validate(initialValue)) {
            // FIXME: effects
            console.warn(`"${initialValue}" is not a valid value for type "${type}"`);
            initialValue = null;
        }

        const handleAction = generateSpecificHandleAction(type);
        const defaultReducer = generateDefaultReducer(validate, handleAction);

        return generateCreateReducer(defaultReducer, initialValue);
    };

};






// ============ UTILS ============ //

const generateBindActions = (typeConfig = DEFAULT_CONFIG) => type => targetId => {
    if (typeConfig !== DEFAULT_CONFIG) {
      typeConfig = mergeConfigs(DEFAULT_CONFIG, typeConfig);
    }
    if (typeConfig[type] && typeConfig[type].actionCreators) {
      const wrap = bindActionCreator(targetId);
      return Object.keys(typeConfig[type].actionCreators).reduce((acc, key) => {
          acc[key] = wrap(typeConfig[type].actionCreators[key]);
          return acc;
      }, {});
    }
    return {};
};


module.exports = {

    bindActionCreator, // TODO: rename

    generateBindActions,

    DEFAULT_CONFIG,
    createCustomCreateReducer,
};
module.exports.default = module.exports;
