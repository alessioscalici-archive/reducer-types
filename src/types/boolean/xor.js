const { PREFIX } = require('../const');

const id = 'xor';
const type = `${PREFIX}boolean.${id}`;

const creator = value => ({ type, payload: { value } });

const handler = (state, action) => {
  if (state === null) return state;
  return action.payload.value ? !state : state;
};


module.exports = {
  id,
  type,
  creator,
  handler,
};
