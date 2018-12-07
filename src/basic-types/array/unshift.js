
const { PREFIX } = require('../const');

const id = 'unshift';
const type = `${PREFIX}array.${id}`;

const handler = (state, action) => (state ? [action.payload.value, ...state] : state);

const creator = value => ({ type, payload: { value } });


module.exports = {
  id,
  type,
  creator,
  handler,
};
