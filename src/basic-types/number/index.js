const buildType = require('../../lib/buildType');

module.exports = buildType(
  require('./set'),
  require('./add'),
  require('./subtract'),
  require('./multiply'),
  require('./divide'),
  require('./mod'),
  require('./negate'),
  require('./bitwiseAnd'),
  require('./bitwiseOr'),
  require('./bitwiseXor'),
);
