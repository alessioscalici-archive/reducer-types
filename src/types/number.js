
const { PREFIX, TYPE_NUMBER } = require('./const');


// action types
const ACTION_TYPE_ADD = `${PREFIX}add`;
const ACTION_TYPE_SUBTRACT = `${PREFIX}subtract`;
const ACTION_TYPE_MULTIPLY = `${PREFIX}multiply`;
const ACTION_TYPE_DIVIDE = `${PREFIX}divide`;
const ACTION_TYPE_MOD = `${PREFIX}mod`;
const ACTION_TYPE_NEGATE = `${PREFIX}negate`;
const ACTION_TYPE_BW_AND = `${PREFIX}bw_and`;
const ACTION_TYPE_BW_OR = `${PREFIX}bw_or`;
const ACTION_TYPE_BW_XOR = `${PREFIX}bw_xor`;

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
const ahAdd = (state, action) => (state === null ? state : state + action.payload.value);
const ahSubtract = (state, action) => (state === null ? state : state - action.payload.value);
const ahMultiply = (state, action) => (state === null ? state : state * action.payload.value);
const ahDivide = (state, action) => (state === null ? state : state / action.payload.value);
const ahMod = (state, action) => (state === null ? state : state % action.payload.value);
const ahNegate = state => (state === null ? state : -state);
const ahBwAnd = (state, action) => (state === null ? state : state & action.payload.value);
const ahBwOr = (state, action) => (state === null ? state : state | action.payload.value);
const ahBwXor = (state, action) => (state === null ? state : state ^ action.payload.value);

// validator
const isNullOrNumber = val => (val === null || (typeof val === TYPE_NUMBER && !isNaN(val)));

module.exports = {
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
    actionCreators: { add, subtract, multiply, divide, mod, negate, bitwiseAnd, bitwiseOr, bitwiseXor },
    actionTypes: {
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
