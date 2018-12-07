const { PREFIX } = require('../const');

const id = 'set';
const type = `${PREFIX}string.${id}`;

const handler = (state, action) => (typeof action.payload.value === 'string' ? action.payload.value : null);

const creator = value => ({ type, payload: { value } });


module.exports = {
  id,
  type,
  creator,
  handler,
};
