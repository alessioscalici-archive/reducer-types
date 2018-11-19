
const {
  actionCreators: {
    and,
    or,
    xor,
    not,
  },
  actionTypes: {
    ACTION_TYPE_AND,
    ACTION_TYPE_OR,
    ACTION_TYPE_XOR,
    ACTION_TYPE_NOT,
  },
} = require('../../../src/types/boolean');


const VALUE = true;


describe('and', () => {
  it('creates an action with the correct type', () => {
    const action = and(VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(ACTION_TYPE_AND);
  });

  it('creates an action with the correct properties', () => {
    const action = and(VALUE);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('or', () => {
  it('creates an action with the correct type', () => {
    const action = or(VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(ACTION_TYPE_OR);
  });

  it('creates an action with the correct properties', () => {
    const action = or(VALUE);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('xor', () => {
  it('creates an action with the correct type', () => {
    const action = xor(VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(ACTION_TYPE_XOR);
  });

  it('creates an action with the correct properties', () => {
    const action = xor(VALUE);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('not', () => {
  it('creates an action with the correct type', () => {
    const action = not();
    expect(action).toBeTruthy();
    expect(action.type).toBe(ACTION_TYPE_NOT);
  });

  it('creates an action with the correct properties', () => {
    const action = not();
    expect(action).toBeTruthy();
    expect(action.payload).toBeUndefined();
  });
});
