
const { PREFIX, TYPE_STRING } = require('./const');


// action types
const ACTION_TYPE_UPPERCASE = `${PREFIX}uppercase`;
const ACTION_TYPE_LOWERCASE = `${PREFIX}lowercase`;

// action creators
const uppercase = value => ({ type: ACTION_TYPE_UPPERCASE });
const lowercase = value => ({ type: ACTION_TYPE_LOWERCASE });

// action handlers
const ahUppercase = state => state && state.toUpperCase();
const ahLowercase = state => state && state.toLowerCase();

// validator
const isNullOrString = val => (val === null || typeof val === TYPE_STRING);


module.exports = {
    validate: isNullOrString,
    actionHandlers: { ahUppercase, ahLowercase },
    actionCreators: { uppercase, lowercase },
    actionTypes: {
      ACTION_TYPE_UPPERCASE,
      ACTION_TYPE_LOWERCASE,
    },
};
