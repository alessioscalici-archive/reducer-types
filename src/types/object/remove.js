const { PREFIX } = require('../const');

const type = `${PREFIX}object.remove`;

const creator = key => ({ type, payload: { key } });

const handler = (state, action) => {
  if (!state || !(action.payload.key in state)) {
    return state;
  }
  const { [action.payload.key]: val, ...res } = state;
  return res;
};


module.exports = {
  type,
  creator,
  handler,
};
