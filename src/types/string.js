
const { PREFIX } = require('./const');
const { ACTION_TYPE_SET, set } = require('../actions');


// action types
const ACTION_TYPE_UPPERCASE = `${PREFIX}uppercase`;
const ACTION_TYPE_LOWERCASE = `${PREFIX}lowercase`;

// action creators
const uppercase = () => ({ type: ACTION_TYPE_UPPERCASE });
const lowercase = () => ({ type: ACTION_TYPE_LOWERCASE });

// action handlers
const ahSet = (state, action) => (typeof action.payload.value === 'string' ? action.payload.value : null);

const ahUppercase = state => state && state.toUpperCase();
const ahLowercase = state => state && state.toLowerCase();


module.exports = {
  actionHandlers: {
    [ACTION_TYPE_SET]: ahSet,
    [ACTION_TYPE_UPPERCASE]: ahUppercase,
    [ACTION_TYPE_LOWERCASE]: ahLowercase,
  },
  actionCreators: { set, uppercase, lowercase },
  actionTypes: {
    ACTION_TYPE_SET,
    ACTION_TYPE_UPPERCASE,
    ACTION_TYPE_LOWERCASE,
  },
};
