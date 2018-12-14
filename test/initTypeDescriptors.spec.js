
const initTypeDescriptors = require('../src/initTypeDescriptors');

const {
  USERTYPE_CONFIG,
} = require('./mocks/customConfigs');


describe('used without any parameter should throw an error', () => {
  expect(() => initTypeDescriptors()).toThrow();
});


describe('used with a custom configuration containing new types', () => {
  const type = initTypeDescriptors(USERTYPE_CONFIG);


  it('should define the custom types', () => {
    expect(typeof type.userType).toBe('function');
  });

  describe('custom types descriptor', () => {
    const VALID_VALUE = { username: 'pippo', password: '123456' };

    it('should define isLeaf to true', () => {
      const descr = type.userType(VALID_VALUE);
      expect(descr.isLeaf).toBe(true);
    });

    it('should define initialValue to the value passed in the descriptor', () => {
      const descr = type.userType(VALID_VALUE);
      expect(descr.initialValue).toBe(VALID_VALUE);
    });
  });
});
