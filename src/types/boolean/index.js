const buildType = require('../../lib/buildType');

const set = require('./set');
const and = require('./and');
const or = require('./or');
const xor = require('./xor');
const not = require('./not');


module.exports = buildType({
  set, and, or, xor, not,
});
