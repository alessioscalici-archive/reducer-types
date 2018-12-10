const { PREFIX } = require('../const');

const id = 'set';
const type = `${PREFIX}object.${id}`;

const creator = value => ({ type, payload: { value } });

const handler = (state, action) => ((action.payload.value === null || (typeof action.payload.value === 'object' && action.payload.value.constructor === Object)) ? action.payload.value : null);


module.exports = {
  id,
  type,
  creator,
  handler,
};
