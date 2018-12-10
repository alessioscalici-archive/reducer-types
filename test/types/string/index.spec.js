
require('../../mocks/jestMatchers');
const typeObject = require('../../../src/types/string');


it('exports a valid type object', () => {
  expect(typeObject).toBeValidTypeObject();
});
