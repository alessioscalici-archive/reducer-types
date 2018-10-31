
const {
    TYPE_STRING,
    TYPE_NUMBER,
    TYPE_BOOLEAN,
    TYPE_OBJECT,
    TYPE_ARRAY,
} = require('./types');





const PREFIX = 'rd:';


// ============ ACTIONS ============ //

// Generic
const RM_SET = `${PREFIX}set`;

// Object
const RM_ENTRY = `${PREFIX}entry`;
const RM_REMOVE = `${PREFIX}remove`;

// Array
const RM_PUSH = `${PREFIX}push`;
const RM_POP = `${PREFIX}pop`;
const RM_UNSHIFT = `${PREFIX}unshift`;
const RM_SHIFT = `${PREFIX}shift`;

// Number
const RM_ADD = `${PREFIX}add`;
const RM_SUBTRACT = `${PREFIX}subtract`;
const RM_MULTIPLY = `${PREFIX}multiply`;
const RM_DIVIDE = `${PREFIX}divide`;
const RM_MOD = `${PREFIX}mod`;
const RM_NEGATE = `${PREFIX}negate`;
const RM_BW_AND = `${PREFIX}bw_and`;
const RM_BW_OR = `${PREFIX}bw_or`;
const RM_BW_XOR = `${PREFIX}bw_xor`;

// Boolean
const RM_AND = `${PREFIX}and`;
const RM_OR = `${PREFIX}or`;
const RM_XOR = `${PREFIX}xor`;
const RM_NOT = `${PREFIX}not`;

// String
const RM_UPPERCASE = `${PREFIX}uppercase`;
const RM_LOWERCASE = `${PREFIX}lowercase`;



// Compose
const RM_COMPOSED = `${PREFIX}composed`;

// Multiaction
const RM_MULTIACTION = `${PREFIX}multiaction`;


const set = value => ({ type: RM_SET, payload: { value } });

const entry = (key, value) => ({ type: RM_ENTRY, payload: { key, value } });
const remove = key => ({ type: RM_REMOVE, payload: { key } });

const push = value => ({ type: RM_PUSH, payload: { value } });
const unshift = value => ({ type: RM_UNSHIFT, payload: { value } });
const pop = () => ({ type: RM_POP });
const shift = () => ({ type: RM_SHIFT });


const add = value => ({ type: RM_ADD, payload: { value } });
const subtract = value => ({ type: RM_SUBTRACT, payload: { value } });
const multiply = value => ({ type: RM_MULTIPLY, payload: { value } });
const divide = value => ({ type: RM_DIVIDE, payload: { value } });
const mod = value => ({ type: RM_MOD, payload: { value } });
const negate = value => ({ type: RM_NEGATE, payload: { value } });
const bitwiseAnd = value => ({ type: RM_BW_AND, payload: { value } });
const bitwiseOr = value => ({ type: RM_BW_OR, payload: { value } });
const bitwiseXor = value => ({ type: RM_BW_XOR, payload: { value } });

const and = value => ({ type: RM_AND, payload: { value } });
const or = value => ({ type: RM_OR, payload: { value } });
const xor = value => ({ type: RM_XOR, payload: { value } });
const not = value => ({ type: RM_NOT });

const uppercase = value => ({ type: RM_UPPERCASE });
const lowercase = value => ({ type: RM_LOWERCASE });


const compose = (...actions) => ({ type: RM_COMPOSED, payload: { actions } });

const multiAction = (...actions) => {
    const actionsMap = actions.reduce((acc, act) => {
        if (!act) {
          return acc;
        }
        if (act && act.meta && act.meta.reduxId) {
            if(!acc[act.meta.reduxId]) {
                acc[act.meta.reduxId] = [];
            }
            acc[act.meta.reduxId].push(act);
        } else if (act && act.type === RM_MULTIACTION) {
            Object.keys(act.payload.actionsMap).forEach((reduxId) => {
                if(!acc[reduxId]) {
                    acc[reduxId] = [];
                }
                acc[reduxId] = acc[reduxId].concat(act.payload.actionsMap[reduxId]);
            });
        }
        return acc;
    }, {});
    return { type: RM_MULTIACTION, payload: { actionsMap } };
};


// TODO: bind only actions for the target type

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
        [RM_PUSH]: ahPush,
        [RM_UNSHIFT]: ahUnshift,
        [RM_POP]: ahPop,
        [RM_SHIFT]: ahShift,
    },
    [TYPE_OBJECT]: {
        [RM_ENTRY]: ahEntry,
        [RM_REMOVE]: ahRemove,
    },
    [TYPE_BOOLEAN]: {
        [RM_AND]: ahAnd,
        [RM_OR]: ahOr,
        [RM_XOR]: ahXor,
        [RM_NOT]: ahNot,
    },
    [TYPE_NUMBER]: {
        [RM_ADD]: ahAdd,
        [RM_SUBTRACT]: ahSubtract,
        [RM_MULTIPLY]: ahMultiply,
        [RM_DIVIDE]: ahDivide,
        [RM_MOD]: ahMod,
        [RM_NEGATE]: ahNegate,
        [RM_BW_AND]: ahBwAnd,
        [RM_BW_OR]: ahBwOr,
        [RM_BW_XOR]: ahBwXor,
    },
    [TYPE_STRING]: {
        [RM_UPPERCASE]: ahUppercase,
        [RM_LOWERCASE]: ahLowercase,
    },
};



// ============ BINDING ============ //


const bindActionCreator = (reduxId) => (actionCreator) => (...args) => {
    const action = actionCreator(...args);
    if (!action) return action;
    if (!action.meta) action.meta = {};
    action.meta.reduxId = reduxId;
    action.meta.reduxDebug = `${action.type}{${reduxId}}`; // TODO: move descriptive text to action type
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

const isValidType = type => [TYPE_STRING, TYPE_NUMBER, TYPE_BOOLEAN, TYPE_OBJECT, TYPE_ARRAY].includes(type);




const createReducer = (customActionMap = null) => {

    
    return (type = TYPE_STRING, initialValue = null) => {
        if (!isValidType(type)) {
            throw new Error(`Type "${type}" is not supported!`);
        }


        // TODO: bind only functions for the given type
        const typeActionMap = DEFAULT_ACTION_MAP[type];
        const actionMap = typeof customActionMap === TYPE_OBJECT ?
            { ...typeActionMap, ...customActionMap } :
            typeActionMap;


        const defaultReducer = (state, action) => {

            // TODO: Unify composed to multiaction?
            if (action.type === RM_COMPOSED) {
                return action.payload.actions.reduce((acc, act) => {
                    if (actionMap[act.type]) {
                        return actionMap[act.type](acc, act);
                    }
                    return acc;
                }, state);
            } else if (action.type === RM_SET) {

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




        return (reduxId) => (state = initialValue, action) => {

            if (!action) return state;

            if (action.type === RM_MULTIACTION) {
                if (action.payload.actionsMap[reduxId]) {
                    return action.payload.actionsMap[reduxId].reduce(defaultReducer, state);
                }
            }

            if (!action.meta || action.meta.reduxId !== reduxId) {
                return state;
            }

            return defaultReducer(state, action);
        };
    };

}



// ============ UTILS ============ //

const bindActions = (reduxId, arrayActions) => {
    const wrap = bindActionCreator(reduxId);
    return Object.keys(arrayActions).reduce((acc, key) => {
        acc[key] = wrap(arrayActions[key]);
        return acc;
    }, {});
};

const bindGenericActions = reduxId => bindActions(reduxId, { set, compose });
const bindArrayActions = reduxId => bindActions(reduxId, { push, unshift, pop, shift });
const bindObjectActions = reduxId => bindActions(reduxId, { entry, remove });
const bindNumberActions = reduxId => bindActions(reduxId, { add, subtract, multiply, divide, mod, negate, bitwiseAnd, bitwiseOr, bitwiseXor });
const bindBooleanActions = reduxId => bindActions(reduxId, { and, or, xor, not });
const bindStringActions = reduxId => bindActions(reduxId, { uppercase, lowercase });





module.exports = {

    // Generic set action
    SET: RM_SET,
    set,

    // Object actions
    ENTRY: RM_ENTRY,
    REMOVE: RM_REMOVE,
    entry,
    remove,

    // Array actions
    PUSH: RM_PUSH,
    POP: RM_POP,
    SHIFT: RM_SHIFT,
    UNSHIFT: RM_UNSHIFT,
    push,
    pop,
    shift,
    unshift,

    // Number actions
    ADD: RM_ADD,
    SUBTRACT: RM_SUBTRACT,
    MULTIPLY: RM_MULTIPLY,
    DIVIDE: RM_DIVIDE,
    MOD: RM_MOD,
    NEGATE: RM_NEGATE,
    BW_AND: RM_BW_AND,
    BW_OR: RM_BW_OR,
    BW_XOR: RM_BW_XOR,
    add,
    subtract,
    multiply,
    divide,
    mod,
    negate,
    bitwiseAnd,
    bitwiseOr,
    bitwiseXor,

    // Boolean actions
    AND: RM_AND,
    OR: RM_OR,
    XOR: RM_XOR,
    NOT: RM_NOT,
    and,
    or,
    xor,
    not,

    // String actions
    UPPERCASE: RM_UPPERCASE,
    LOWERCASE: RM_LOWERCASE,
    uppercase,
    lowercase,


    // Action composition
    COMPOSE: RM_COMPOSED,
    MULTIACTION: RM_MULTIACTION,
    compose,
    multiAction,


    bindActionCreator, // TODO: rename

    bindGenericActions,
    bindArrayActions,
    bindObjectActions,
    bindNumberActions,
    bindBooleanActions,
    bindStringActions,


    DEFAULT_ACTION_MAP,
    createReducer,
};
module.exports.default = module.exports;
