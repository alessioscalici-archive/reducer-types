const { PREFIX } = require('../const');

const type = `${PREFIX}array.unshift`;

const creator = value => ({ type, payload: { value } });

const handler = (state, action) => (state ? [action.payload.value, ...state] : state);


module.exports = {
  type,
  creator,
  handler,
};
