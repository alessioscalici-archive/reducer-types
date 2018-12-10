const buildType = require('../../lib/buildType');

module.exports = buildType(
  require('./set'),
  require('./entry'),
  require('./remove'),
);
