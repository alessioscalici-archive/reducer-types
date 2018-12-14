const { PREFIX } = require('../const');

const type = `${PREFIX}array.set`;

const creator = value => ({ type, payload: { value } });

const handler = (state, action) => (
  action.payload.value === null || Array.isArray(action.payload.value)
    ? action.payload.value
    : null
);


module.exports = {
  type,
  creator,
  handler,
};
