const { PREFIX } = require('../const');

const id = 'set';
const type = `${PREFIX}boolean.${id}`;

const handler = (state, action) => (typeof action.payload.value === 'boolean' ? action.payload.value : null);

const creator = value => ({ type, payload: { value } });


module.exports = {
  id,
  type,
  creator,
  handler,
};
