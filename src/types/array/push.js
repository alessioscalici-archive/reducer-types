const { PREFIX } = require('../const');

const type = `${PREFIX}array.push`;

const creator = value => ({ type, payload: { value } });

const handler = (state, action) => (state ? [...state, action.payload.value] : state);


module.exports = {
  type,
  creator,
  handler,
};
