
require('../../mocks/jestMatchers');
const typeObject = require('../../../src/types/array');


it('exports a valid type object', () => {
  expect(typeObject).toBeValidTypeObject();
});
