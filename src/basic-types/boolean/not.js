const { PREFIX } = require('../const');

const id = 'not';
const type = `${PREFIX}boolean.${id}`;

const creator = () => ({ type });

const handler = state => (state === null ? state : !state);


module.exports = {
  id,
  type,
  creator,
  handler,
};