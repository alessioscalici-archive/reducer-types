const buildType = require('../../lib/buildType');

module.exports = buildType(
  require('./set'),
  require('./and'),
  require('./or'),
  require('./xor'),
  require('./not'),
);
