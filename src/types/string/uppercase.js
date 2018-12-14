const { PREFIX } = require('../const');

const type = `${PREFIX}string.uppercase`;

const creator = () => ({ type });

const handler = state => state && state.toUpperCase();


module.exports = {
  type,
  creator,
  handler,
};
