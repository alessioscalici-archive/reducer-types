const { PREFIX } = require('../const');

const id = 'or';
const type = `${PREFIX}boolean.${id}`;

const creator = value => ({ type, payload: { value } });

const handler = (state, action) => (state === null ? state : state || action.payload.value);


module.exports = {
  id,
  type,
  creator,
  handler,
};
