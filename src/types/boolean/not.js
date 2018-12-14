const { PREFIX } = require('../const');

const type = `${PREFIX}boolean.not`;

const creator = () => ({ type });

const handler = state => (state === null ? state : !state);


module.exports = {
  type,
  creator,
  handler,
};
