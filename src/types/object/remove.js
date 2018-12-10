const { PREFIX } = require('../const');

const id = 'remove';
const type = `${PREFIX}object.${id}`;

const creator = key => ({ type, payload: { key } });

const handler = (state, action) => {
  if (!state || !(action.payload.key in state)) {
    return state;
  }
  const { [action.payload.key]: val, ...res } = state;
  return res;
};


module.exports = {
  id,
  type,
  creator,
  handler,
};
