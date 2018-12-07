
const {
  actionCreators: {
    and,
    or,
    xor,
    not,
  },
  actionTypes,
} = require('../../../src/basic-types/boolean');


const VALUE = true;


describe('and', () => {
  it('creates an action with the correct type', () => {
    const action = and(VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(actionTypes.and);
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
    expect(action.type).toBe(actionTypes.or);
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
    expect(action.type).toBe(actionTypes.xor);
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
    expect(action.type).toBe(actionTypes.not);
  });

  it('creates an action with the correct properties', () => {
    const action = not();
    expect(action).toBeTruthy();
    expect(action.payload).toBeUndefined();
  });
});
