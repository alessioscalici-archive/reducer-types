
require('../../mocks/jestMatchers');
const typeObject = require('../../../src/types/number');


it('exports a valid type object', () => {
  expect(typeObject).toBeValidTypeObject();
});
