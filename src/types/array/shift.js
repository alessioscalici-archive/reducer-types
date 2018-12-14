const { PREFIX } = require('../const');

const type = `${PREFIX}array.shift`;

const creator = () => ({ type });

const handler = state => (state ? state.slice(1) : state);


module.exports = {
  type,
  creator,
  handler,
};
