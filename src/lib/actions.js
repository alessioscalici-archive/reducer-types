
const { PREFIX } = require('../basic-types/const');


// ============ ACTIONS ============ //

// Generic
const ACTION_TYPE_SET = `${PREFIX}set`;


// compose
const ACTION_TYPE_COMPOSE = `${PREFIX}compose`;


const set = value => ({ type: ACTION_TYPE_SET, payload: { value } });


module.exports = {
  ACTION_TYPE_SET,
  ACTION_TYPE_COMPOSE,
  set,
};
