const { PREFIX } = require('../const');

const type = `${PREFIX}array.pop`;

const creator = () => ({ type });

const handler = state => (state ? state.slice(0, state.length - 1) : state);


module.exports = {
  type,
  creator,
  handler,
};
