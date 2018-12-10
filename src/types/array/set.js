const { PREFIX } = require('../const');

const id = 'set';
const type = `${PREFIX}array.${id}`;

const handler = (state, action) => (
  action.payload.value === null || Array.isArray(action.payload.value)
    ? action.payload.value
    : null
);

const creator = value => ({ type, payload: { value } });


module.exports = {
  id,
  type,
  creator,
  handler,
};
