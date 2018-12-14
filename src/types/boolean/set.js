const { PREFIX } = require('../const');

const type = `${PREFIX}boolean.set`;

const creator = value => ({ type, payload: { value } });

const handler = (state, action) => (typeof action.payload.value === 'boolean' ? action.payload.value : null);


module.exports = {
  type,
  creator,
  handler,
};
