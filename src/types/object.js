
const { PREFIX, TYPE_OBJECT } = require('./const');


// action types
const ACTION_TYPE_ENTRY = `${PREFIX}entry`;
const ACTION_TYPE_REMOVE = `${PREFIX}remove`;

// action creators
const entry = (key, value) => ({ type: ACTION_TYPE_ENTRY, payload: { key, value } });
const remove = key => ({ type: ACTION_TYPE_REMOVE, payload: { key } });

// action handlers
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

// validator
const isNullOrObject = val => (val === null || (typeof val === TYPE_OBJECT && val.constructor === Object));


module.exports = {
    validate: isNullOrObject,
    actionHandlers: {
      [ACTION_TYPE_ENTRY]: ahEntry,
      [ACTION_TYPE_REMOVE]: ahRemove,
    },
    actionCreators: { entry, remove },
    actionTypes: {
      ACTION_TYPE_ENTRY,
      ACTION_TYPE_REMOVE,
    },
};
