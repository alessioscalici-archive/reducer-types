const { PREFIX } = require('../const');

const id = 'xor';
const type = `${PREFIX}number.${id}`;

const creator = value => ({ type, payload: { value } });

// eslint-disable-next-line no-bitwise
const handler = (state, action) => (state === null ? state : state ^ action.payload.value);

module.exports = {
  id,
  type,
  creator,
  handler,
};
