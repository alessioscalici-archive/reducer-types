const { PREFIX } = require('../const');

const id = 'set';
const type = `${PREFIX}number.${id}`;

const creator = value => ({ type, payload: { value } });

const handler = (state, action) => ((typeof action.payload.value === 'number' && !Number.isNaN(action.payload.value)) ? action.payload.value : null);


module.exports = {
  id,
  type,
  creator,
  handler,
};
