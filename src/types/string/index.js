const buildType = require('../../lib/buildType');

module.exports = buildType(
  require('./set'),
  require('./uppercase'),
  require('./lowercase'),
);
