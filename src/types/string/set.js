const { PREFIX } = require('../const');

const type = `${PREFIX}string.set`;

const creator = value => ({ type, payload: { value } });

const handler = (state, action) => (typeof action.payload.value === 'string' ? action.payload.value : null);


module.exports = {
  type,
  creator,
  handler,
};
