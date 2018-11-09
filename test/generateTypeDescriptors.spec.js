
const {
  generateTypeDescriptors,
} = require('../src/redules');





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

        it('should not allow undefined initial values', () => {
          expect(() => descriptorFunc()).toThrow();
        });

        it('should throw an error if the value provided is not valid', () => {
          expect(() => descriptorFunc(testData.invalidValue)).toThrow();
        });
      });
    });
  });
};


describe('used without any parameter', () => {
  const type = generateTypeDescriptors();
  testDefaultTypeDescriptors(type);
});


const MOCK_CONFIG = {
  userType: {
    validate: user => user === null || (!!(user.username && user.password)),
    actionHandlers: {
      SET_PASSWORD: (state, action) => state ? { ...state, password: action.payload.newPassword } : state,
    },
    actionCreators: {
      setPassword: newPassword => ({ type: SET_PASSWORD, payload: { newPassword } }),
    },
  }
};

describe('used with a custom configuration containing new types', () => {

  const type = generateTypeDescriptors(MOCK_CONFIG);
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

    it('should throw an error if the value provided is not valid', () => {
      expect(() => type.userType('SOME INVALID STUFF')).toThrow();
    });
  });
});


const MOCK_CONFIG_2 = {
  'string': {
    validate: str => (typeof str === 'string'),
  },
};

describe('used with a custom configuration overriding a validation', () => {
  const type = generateTypeDescriptors(MOCK_CONFIG_2);

  it('should respect the new validate function', () => {
    expect(() => type.string(null)).toThrow();
  });
});
