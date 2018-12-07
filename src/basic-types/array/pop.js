
const { PREFIX } = require('../const');

const id = 'pop';
const type = `${PREFIX}array.${id}`;

const handler = state => (state ? state.slice(0, state.length - 1) : state);

const creator = () => ({ type });


module.exports = {
  id,
  type,
  creator,
  handler,
};
