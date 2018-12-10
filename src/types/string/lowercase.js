
const { PREFIX } = require('../const');

const id = 'lowercase';
const type = `${PREFIX}string.${id}`;

const handler = state => state && state.toLowerCase();

const creator = () => ({ type });


module.exports = {
  id,
  type,
  creator,
  handler,
};
