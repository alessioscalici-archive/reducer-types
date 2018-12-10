const buildType = require('../../lib/buildType');

module.exports = buildType(
  require('./set'),
  require('./add'),
  require('./subtract'),
  require('./multiply'),
  require('./divide'),
  require('./mod'),
  require('./not'),
  require('./and'),
  require('./or'),
  require('./xor'),
);
