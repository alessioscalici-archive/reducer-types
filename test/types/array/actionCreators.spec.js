
const {
  actionCreators: {
    push,
    unshift,
    pop,
    shift,
  },
  actionTypes,
} = require('../../../src/basic-types/array');


const VALUE = 'some value';


describe('push', () => {
  it('creates an action with the correct type', () => {
    const action = push(VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(actionTypes.push);
  });

  it('creates an action with the correct value', () => {
    const action = push(VALUE);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});


describe('unshift', () => {
  it('creates an action with the correct type', () => {
    const action = unshift(VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(actionTypes.unshift);
  });

  it('creates an action with the correct value', () => {
    const action = unshift(VALUE);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});

describe('pop', () => {
  it('creates an action with the correct type', () => {
    const action = pop();
    expect(action).toBeTruthy();
    expect(action.type).toBe(actionTypes.pop);
  });

  it('creates an action with no payload', () => {
    const action = pop();
    expect(action).toBeTruthy();
    expect(action.payload).toBeUndefined();
  });
});

describe('shift', () => {
  it('creates an action with the correct type', () => {
    const action = shift();
    expect(action).toBeTruthy();
    expect(action.type).toBe(actionTypes.shift);
  });

  it('creates an action with no payload', () => {
    const action = shift();
    expect(action).toBeTruthy();
    expect(action.payload).toBeUndefined();
  });
});
