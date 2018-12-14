const buildType = require('../../lib/buildType');

const set = require('./set');
const uppercase = require('./uppercase');
const lowercase = require('./lowercase');


module.exports = buildType({
  set, uppercase, lowercase,
});
