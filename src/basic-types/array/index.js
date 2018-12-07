const buildType = require('../../lib/buildType');

module.exports = buildType(
  require('./set'),
  require('./push'),
  require('./pop'),
  require('./shift'),
  require('./unshift'),
);
