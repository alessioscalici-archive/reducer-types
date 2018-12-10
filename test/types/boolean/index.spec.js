
require('../../mocks/jestMatchers');
const typeObject = require('../../../src/types/boolean');


it('exports a valid type object', () => {
  expect(typeObject).toBeValidTypeObject();
});
