
const { PREFIX } = require('../const');

const id = 'shift';
const type = `${PREFIX}array.${id}`;

const handler = state => (state ? state.slice(1) : state);

const creator = () => ({ type });


module.exports = {
  id,
  type,
  creator,
  handler,
};
