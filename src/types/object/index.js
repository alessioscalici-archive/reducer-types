const buildType = require('../../lib/buildType');

const set = require('./set');
const entry = require('./entry');
const remove = require('./remove');


module.exports = buildType({
  set, entry, remove,
});
