
const { PREFIX } = require('../const');

const id = 'uppercase';
const type = `${PREFIX}string.${id}`;

const handler = state => state && state.toUpperCase();

const creator = () => ({ type });


module.exports = {
  id,
  type,
  creator,
  handler,
};
