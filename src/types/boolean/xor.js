const { PREFIX } = require('../const');

const type = `${PREFIX}boolean.xor`;

const creator = value => ({ type, payload: { value } });

const handler = (state, action) => {
  if (state === null) return state;
  return action.payload.value ? !state : state;
};


module.exports = {
  type,
  creator,
  handler,
};
