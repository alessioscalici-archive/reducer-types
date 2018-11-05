
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



const DEFAULT_ACTION_MAP = {
    [TYPE_ARRAY]: {
        [ACTION_TYPE_PUSH]: ahPush,
        [ACTION_TYPE_UNSHIFT]: ahUnshift,
        [ACTION_TYPE_POP]: ahPop,
        [ACTION_TYPE_SHIFT]: ahShift,
    },
    [TYPE_OBJECT]: {
        [ACTION_TYPE_ENTRY]: ahEntry,
        [ACTION_TYPE_REMOVE]: ahRemove,
    },
    [TYPE_BOOLEAN]: {
        [ACTION_TYPE_AND]: ahAnd,
        [ACTION_TYPE_OR]: ahOr,
        [ACTION_TYPE_XOR]: ahXor,
        [ACTION_TYPE_NOT]: ahNot,
    },
    [TYPE_NUMBER]: {
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
    [TYPE_STRING]: {
        [ACTION_TYPE_UPPERCASE]: ahUppercase,
        [ACTION_TYPE_LOWERCASE]: ahLowercase,
    },
};



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

const typeCheckerMap = {
    [TYPE_ARRAY]: isNullOrArray,
    [TYPE_OBJECT]: isNullOrObject,
    [TYPE_BOOLEAN]: isNullOrBoolean,
    [TYPE_NUMBER]: isNullOrNumber,
    [TYPE_STRING]: isNullOrString,
};

const isValidType = type => !!typeCheckerMap[type];



const createCustomCreateReducer = (customActionMap = null) => {


    return (type, initialValue = null) => {
        if (!isValidType(type)) {
            throw new Error(`Type "${type}" is not supported!`);
        }

        // check the type of the initial value
        if (!typeCheckerMap[type](initialValue)) {
            // FIXME: effects
            console.warn(`"${initialValue}" is not a valid value for type "${type}"`);
            initialValue = null;
        }


        const typeActionMap = DEFAULT_ACTION_MAP[type];
        const actionMap = customActionMap && customActionMap[type] ?
            { ...typeActionMap, ...customActionMap[type] } :
            typeActionMap;


        const defaultReducer = (state, action) => {

            if (action.type === ACTION_TYPE_SET) {

                if (typeCheckerMap[type](action.payload.value)) {
                    return action.payload.value;
                } else {
                    // FIXME: effect!
                    console.warn(`${action.meta.reduxDebug}: Value ${action.payload.value} is not a valid "${type}" value`);
                }

            }


            if (actionMap[action.type]) {
                return actionMap[action.type](state, action);
            }
            return state;
        };




        return (targetId) => (state = initialValue, action) => {

            if (!action) return state;

            if (action.type === ACTION_TYPE_MULTIACTION) {
                if (action.payload.actionsMap[targetId]) {
                    return action.payload.actionsMap[targetId].reduce(defaultReducer, state);
                }
            }

            if (!action.meta || action.meta.targetId !== targetId) {
                return state;
            }

            return defaultReducer(state, action);
        };
    };

};

const createReducer = createCustomCreateReducer();



// ============ UTILS ============ //

const bindActions = (targetId, arrayActions) => {
    const wrap = bindActionCreator(targetId);
    return Object.keys(arrayActions).reduce((acc, key) => {
        acc[key] = wrap(arrayActions[key]);
        return acc;
    }, {});
};

const bindArrayActions = targetId => bindActions(targetId, { set, push, unshift, pop, shift });
const bindObjectActions = targetId => bindActions(targetId, { set, entry, remove });
const bindNumberActions = targetId => bindActions(targetId, { set, add, subtract, multiply, divide, mod, negate, bitwiseAnd, bitwiseOr, bitwiseXor });
const bindBooleanActions = targetId => bindActions(targetId, { set, and, or, xor, not });
const bindStringActions = targetId => bindActions(targetId, { set, uppercase, lowercase });





module.exports = {

    bindActionCreator, // TODO: rename

    bindArrayActions,
    bindObjectActions,
    bindNumberActions,
    bindBooleanActions,
    bindStringActions,


    DEFAULT_ACTION_MAP,
    createReducer,
};
module.exports.default = module.exports;
