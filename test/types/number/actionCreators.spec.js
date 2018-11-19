
const {
  actionCreators: {
    add,
    subtract,
    multiply,
    divide,
    mod,
    negate,
    bitwiseAnd,
    bitwiseOr,
    bitwiseXor,
  },
  actionTypes: {
    ACTION_TYPE_ADD,
    ACTION_TYPE_SUBTRACT,
    ACTION_TYPE_MULTIPLY,
    ACTION_TYPE_DIVIDE,
    ACTION_TYPE_MOD,
    ACTION_TYPE_NEGATE,
    ACTION_TYPE_BW_AND,
    ACTION_TYPE_BW_OR,
    ACTION_TYPE_BW_XOR,
  },
} = require('../../../src/types/number');


const VALUE = 42;


describe('add', () => {
  it('creates an action with the correct type', () => {
    const action = add(VALUE);
    expect(action.type).toBe(ACTION_TYPE_ADD);
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
    expect(action.type).toBe(ACTION_TYPE_SUBTRACT);
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
    expect(action.type).toBe(ACTION_TYPE_MULTIPLY);
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
    expect(action.type).toBe(ACTION_TYPE_DIVIDE);
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
    expect(action.type).toBe(ACTION_TYPE_MOD);
  });

  it('creates an action with the correct properties', () => {
    const action = mod(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('negate', () => {
  it('creates an action with the correct type', () => {
    const action = negate();
    expect(action.type).toBe(ACTION_TYPE_NEGATE);
  });

  it('creates an action with no payload', () => {
    const action = negate();
    expect(action.payload).toBeUndefined();
  });
});


describe('bitwiseAnd', () => {
  it('creates an action with the correct type', () => {
    const action = bitwiseAnd(VALUE);
    expect(action.type).toBe(ACTION_TYPE_BW_AND);
  });

  it('creates an action with the correct properties', () => {
    const action = bitwiseAnd(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('bitwiseOr', () => {
  it('creates an action with the correct type', () => {
    const action = bitwiseOr(VALUE);
    expect(action.type).toBe(ACTION_TYPE_BW_OR);
  });

  it('creates an action with the correct properties', () => {
    const action = bitwiseOr(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('bitwiseXor', () => {
  it('creates an action with the correct type', () => {
    const action = bitwiseXor(VALUE);
    expect(action.type).toBe(ACTION_TYPE_BW_XOR);
  });

  it('creates an action with the correct properties', () => {
    const action = bitwiseXor(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});
