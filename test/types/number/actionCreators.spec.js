
const {
  actionCreators: {
    add,
    subtract,
    multiply,
    divide,
    mod,
    not,
    and,
    or,
    xor,
  },
  actionTypes,
} = require('../../../src/types/number');


const VALUE = 42;


describe('add', () => {
  it('creates an action with the correct type', () => {
    const action = add(VALUE);
    expect(action.type).toBe(actionTypes.add);
  });

  it('creates an action with the correct properties', () => {
    const action = add(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('subtract', () => {
  it('creates an action with the correct type', () => {
    const action = subtract(VALUE);
    expect(action.type).toBe(actionTypes.subtract);
  });

  it('creates an action with the correct properties', () => {
    const action = subtract(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('multiply', () => {
  it('creates an action with the correct type', () => {
    const action = multiply(VALUE);
    expect(action.type).toBe(actionTypes.multiply);
  });

  it('creates an action with the correct properties', () => {
    const action = multiply(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('divide', () => {
  it('creates an action with the correct type', () => {
    const action = divide(VALUE);
    expect(action.type).toBe(actionTypes.divide);
  });

  it('creates an action with the correct properties', () => {
    const action = divide(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('mod', () => {
  it('creates an action with the correct type', () => {
    const action = mod(VALUE);
    expect(action.type).toBe(actionTypes.mod);
  });

  it('creates an action with the correct properties', () => {
    const action = mod(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('not', () => {
  it('creates an action with the correct type', () => {
    const action = not();
    expect(action.type).toBe(actionTypes.not);
  });

  it('creates an action with no payload', () => {
    const action = not();
    expect(action.payload).toBeUndefined();
  });
});


describe('and', () => {
  it('creates an action with the correct type', () => {
    const action = and(VALUE);
    expect(action.type).toBe(actionTypes.and);
  });

  it('creates an action with the correct properties', () => {
    const action = and(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('or', () => {
  it('creates an action with the correct type', () => {
    const action = or(VALUE);
    expect(action.type).toBe(actionTypes.or);
  });

  it('creates an action with the correct properties', () => {
    const action = or(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('xor', () => {
  it('creates an action with the correct type', () => {
    const action = xor(VALUE);
    expect(action.type).toBe(actionTypes.xor);
  });

  it('creates an action with the correct properties', () => {
    const action = xor(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});
