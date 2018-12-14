const buildType = require('../../lib/buildType');

const set = require('./set');
const push = require('./push');
const pop = require('./pop');
const shift = require('./shift');
const unshift = require('./unshift');


module.exports = buildType({
  set, push, pop, shift, unshift,
});
