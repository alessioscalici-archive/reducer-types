
const { PREFIX } = require('./const');
const { ACTION_TYPE_SET, set } = require('../actions');


// action types
const ACTION_TYPE_ENTRY = `${PREFIX}object.entry`;
const ACTION_TYPE_REMOVE = `${PREFIX}object.remove`;

// action creators
const entry = (key, value) => ({ type: ACTION_TYPE_ENTRY, payload: { key, value } });
const remove = key => ({ type: ACTION_TYPE_REMOVE, payload: { key } });

// action handlers
const ahSet = (state, action) => ((action.payload.value === null || (typeof action.payload.value === 'object' && action.payload.value.constructor === Object)) ? action.payload.value : null);

const ahEntry = (state, action) => {
  const { key, value } = action.payload;
  return (!state || state[key] === value) ? state : { ...state, [key]: value };
};
const ahRemove = (state, action) => {
  if (!state || !(action.payload.key in state)) {
    return state;
  }
  const { [action.payload.key]: val, ...res } = state;
  return res;
};


module.exports = {
  actionHandlers: {
    [ACTION_TYPE_SET]: ahSet,
    [ACTION_TYPE_ENTRY]: ahEntry,
    [ACTION_TYPE_REMOVE]: ahRemove,
  },
  actionCreators: { set, entry, remove },
  actionTypes: {
    ACTION_TYPE_SET,
    ACTION_TYPE_ENTRY,
    ACTION_TYPE_REMOVE,
  },
};
