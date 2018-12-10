
require('../../mocks/jestMatchers');
const typeObject = require('../../../src/types/object');


it('exports a valid type object', () => {
  expect(typeObject).toBeValidTypeObject();
});
