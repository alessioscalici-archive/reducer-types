const { PREFIX } = require('../const');

const type = `${PREFIX}object.entry`;

const creator = (key, value) => ({ type, payload: { key, value } });

const handler = (state, action) => {
  const { key, value } = action.payload;
  return (!state || state[key] === value) ? state : { ...state, [key]: value };
};


module.exports = {
  type,
  creator,
  handler,
};
