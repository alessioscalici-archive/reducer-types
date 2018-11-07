
const {
  actionCreators: {
    push,
    unshift,
    pop,
    shift,
  },
  actionTypes: {
    ACTION_TYPE_PUSH,
    ACTION_TYPE_UNSHIFT,
    ACTION_TYPE_POP,
    ACTION_TYPE_SHIFT,
  },
} = require('../../../src/types/array');



const VALUE = 'some value';


describe('push', () => {
  it('creates an action with the correct type', () => {
    const action = push(VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(ACTION_TYPE_PUSH);
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
    expect(action.type).toBe(ACTION_TYPE_UNSHIFT);
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
    expect(action.type).toBe(ACTION_TYPE_POP);
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
    expect(action.type).toBe(ACTION_TYPE_SHIFT);
  });

  it('creates an action with no payload', () => {
    const action = shift();
    expect(action).toBeTruthy();
    expect(action.payload).toBeUndefined();
  });
});
