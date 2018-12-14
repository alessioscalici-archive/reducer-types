const { PREFIX } = require('../const');

const type = `${PREFIX}number.xor`;

const creator = value => ({ type, payload: { value } });

// eslint-disable-next-line no-bitwise
const handler = (state, action) => (state === null ? state : state ^ action.payload.value);

module.exports = {
  type,
  creator,
  handler,
};
