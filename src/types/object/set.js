const { PREFIX } = require('../const');

const type = `${PREFIX}object.set`;

const creator = value => ({ type, payload: { value } });

const handler = (state, action) => ((action.payload.value === null || (typeof action.payload.value === 'object' && action.payload.value.constructor === Object)) ? action.payload.value : null);


module.exports = {
  type,
  creator,
  handler,
};
