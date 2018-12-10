const { PREFIX } = require('../const');

const id = 'entry';
const type = `${PREFIX}object.${id}`;

const creator = (key, value) => ({ type, payload: { key, value } });

const handler = (state, action) => {
  const { key, value } = action.payload;
  return (!state || state[key] === value) ? state : { ...state, [key]: value };
};


module.exports = {
  id,
  type,
  creator,
  handler,
};
