const { PREFIX } = require('../const');

const id = 'and';
const type = `${PREFIX}boolean.${id}`;

const handler = (state, action) => (state === null ? state : state && action.payload.value);

const creator = value => ({ type, payload: { value } });


module.exports = {
  id,
  type,
  creator,
  handler,
};
