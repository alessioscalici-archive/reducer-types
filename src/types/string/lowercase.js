const { PREFIX } = require('../const');

const type = `${PREFIX}string.lowercase`;

const creator = () => ({ type });

const handler = state => state && state.toLowerCase();


module.exports = {
  type,
  creator,
  handler,
};
