
const { PREFIX } = require('../const');

const id = 'push';
const type = `${PREFIX}array.${id}`;

const handler = (state, action) => (state ? [...state, action.payload.value] : state);

const creator = value => ({ type, payload: { value } });


module.exports = {
  id,
  type,
  creator,
  handler,
};
