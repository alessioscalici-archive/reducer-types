
const { PREFIX } = require('./const');
const { ACTION_TYPE_SET, set } = require('../actions');

// action types
const ACTION_TYPE_PUSH = `${PREFIX}array.push`;
const ACTION_TYPE_POP = `${PREFIX}array.pop`;
const ACTION_TYPE_UNSHIFT = `${PREFIX}array.unshift`;
const ACTION_TYPE_SHIFT = `${PREFIX}array.shift`;

// action creators
const push = value => ({ type: ACTION_TYPE_PUSH, payload: { value } });
const unshift = value => ({ type: ACTION_TYPE_UNSHIFT, payload: { value } });
const pop = () => ({ type: ACTION_TYPE_POP });
const shift = () => ({ type: ACTION_TYPE_SHIFT });

// action handlers
const ahSet = (state, action) => (
  action.payload.value === null || Array.isArray(action.payload.value)
    ? action.payload.value
    : null
);

const ahPush = (state, action) => (state ? [...state, action.payload.value] : state);
const ahUnshift = (state, action) => (state ? [action.payload.value, ...state] : state);
const ahPop = state => (state ? state.slice(0, state.length - 1) : state);
const ahShift = state => (state ? state.slice(1) : state);


module.exports = {
  actionHandlers: {
    [ACTION_TYPE_SET]: ahSet,
    [ACTION_TYPE_PUSH]: ahPush,
    [ACTION_TYPE_POP]: ahPop,
    [ACTION_TYPE_SHIFT]: ahShift,
    [ACTION_TYPE_UNSHIFT]: ahUnshift,
  },
  actionCreators: {
    set, push, pop, shift, unshift,
  },
  actionTypes: {
    ACTION_TYPE_SET,
    ACTION_TYPE_PUSH,
    ACTION_TYPE_POP,
    ACTION_TYPE_SHIFT,
    ACTION_TYPE_UNSHIFT,
  },
};
