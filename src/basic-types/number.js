
const { PREFIX } = require('./const');
const { ACTION_TYPE_SET, set } = require('../actions');


// action types
const ACTION_TYPE_ADD = `${PREFIX}number.add`;
const ACTION_TYPE_SUBTRACT = `${PREFIX}number.subtract`;
const ACTION_TYPE_MULTIPLY = `${PREFIX}number.multiply`;
const ACTION_TYPE_DIVIDE = `${PREFIX}number.divide`;
const ACTION_TYPE_MOD = `${PREFIX}number.mod`;
const ACTION_TYPE_NEGATE = `${PREFIX}number.negate`;
const ACTION_TYPE_BW_AND = `${PREFIX}number.and`;
const ACTION_TYPE_BW_OR = `${PREFIX}number.or`;
const ACTION_TYPE_BW_XOR = `${PREFIX}number.xor`;

// action creators
const add = value => ({ type: ACTION_TYPE_ADD, payload: { value } });
const subtract = value => ({ type: ACTION_TYPE_SUBTRACT, payload: { value } });
const multiply = value => ({ type: ACTION_TYPE_MULTIPLY, payload: { value } });
const divide = value => ({ type: ACTION_TYPE_DIVIDE, payload: { value } });
const mod = value => ({ type: ACTION_TYPE_MOD, payload: { value } });
const negate = () => ({ type: ACTION_TYPE_NEGATE });
const bitwiseAnd = value => ({ type: ACTION_TYPE_BW_AND, payload: { value } });
const bitwiseOr = value => ({ type: ACTION_TYPE_BW_OR, payload: { value } });
const bitwiseXor = value => ({ type: ACTION_TYPE_BW_XOR, payload: { value } });

// action handlers
// eslint-disable-next-line no-restricted-globals
const ahSet = (state, action) => ((typeof val === 'number' && !isNaN(action.payload.value)) ? action.payload.value : null);

const ahAdd = (state, action) => (state === null ? state : state + action.payload.value);
const ahSubtract = (state, action) => (state === null ? state : state - action.payload.value);
const ahMultiply = (state, action) => (state === null ? state : state * action.payload.value);
const ahDivide = (state, action) => (state === null ? state : state / action.payload.value);
const ahMod = (state, action) => (state === null ? state : state % action.payload.value);
const ahNegate = state => (state === null ? state : -state);
/* eslint-disable no-bitwise */
const ahBwAnd = (state, action) => (state === null ? state : state & action.payload.value);
const ahBwOr = (state, action) => (state === null ? state : state | action.payload.value);
const ahBwXor = (state, action) => (state === null ? state : state ^ action.payload.value);
/* eslint-enable no-bitwise */


module.exports = {
  actionHandlers: {
    [ACTION_TYPE_SET]: ahSet,
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
  actionCreators: {
    set, add, subtract, multiply, divide, mod, negate, bitwiseAnd, bitwiseOr, bitwiseXor,
  },
  actionTypes: {
    ACTION_TYPE_SET,
    ACTION_TYPE_ADD,
    ACTION_TYPE_SUBTRACT,
    ACTION_TYPE_MULTIPLY,
    ACTION_TYPE_DIVIDE,
    ACTION_TYPE_MOD,
    ACTION_TYPE_NEGATE,
    ACTION_TYPE_BW_AND,
    ACTION_TYPE_BW_OR,
    ACTION_TYPE_BW_XOR,
  },
};
