const { PREFIX } = require('../const');

const type = `${PREFIX}number.set`;

const creator = value => ({ type, payload: { value } });

const handler = (state, action) => ((typeof action.payload.value === 'number' && !Number.isNaN(action.payload.value)) ? action.payload.value : null);


module.exports = {
  type,
  creator,
  handler,
};
