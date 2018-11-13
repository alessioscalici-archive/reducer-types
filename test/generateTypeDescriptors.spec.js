
const {
  generateTypeDescriptors,
} = require('../src/redules');

const {
  USERTYPE_CONFIG,
} = require('./mocks/customConfigs');



const testDefaultTypeDescriptors = (type) => {

  const TYPES_TEST_DATA = [
    { typeName: 'string', validValue: 'ABCD', invalidValue: 123 },
    { typeName: 'boolean', validValue: true, invalidValue: [] },
    { typeName: 'number', validValue: 123, invalidValue: true },
    { typeName: 'object', validValue: { hello: 'world' }, invalidValue: 'hello' },
    { typeName: 'array', validValue: [1, 2, 3], invalidValue: {} },
  ];

  describe('should define default types descriptor', () => {
    TYPES_TEST_DATA.forEach((testData) => {
      let descriptorFunc;

      describe(testData.typeName, () => {
        beforeEach(() => {
          descriptorFunc = type[testData.typeName];
        });

        it(`should define function "${testData.typeName}"`, () => {
          const descr = descriptorFunc(testData.validValue);
          expect(typeof descriptorFunc).toBe('function');
        });

        it('should define isLeaf to true', () => {
          const descr = descriptorFunc(testData.validValue);
          expect(descr.isLeaf).toBe(true);
        });

        it('should define initialValue to the value passed in the descriptor', () => {
          const descr = descriptorFunc(testData.validValue);
          expect(descr.initialValue).toBe(testData.validValue);
        });

        it('should allow null initial values', () => {
          const descr = descriptorFunc(null);
          expect(descr.initialValue).toBe(null);
        });

        // FIXME re enable this and fix the typedescriptor
        xit('should not allow undefined initial values', () => {
          expect(() => descriptorFunc()).toThrow();
        });
      });
    });
  });
};


describe('used without any parameter', () => {
  const type = generateTypeDescriptors();
  testDefaultTypeDescriptors(type);
});




describe('used with a custom configuration containing new types', () => {

  const type = generateTypeDescriptors(USERTYPE_CONFIG);
  testDefaultTypeDescriptors(type);  // test if it's containing the default types


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
