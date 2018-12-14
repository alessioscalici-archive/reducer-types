const { PREFIX } = require('../const');

const type = `${PREFIX}number.not`;

const creator = () => ({ type });

const handler = state => (state === null ? state : -state);


module.exports = {
  type,
  creator,
  handler,
};
