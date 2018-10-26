
const {
  set, SET,
  entry, ENTRY,
  remove, REMOVE,
  push, PUSH,
  unshift, UNSHIFT,
  pop, POP,
  shift, SHIFT,
  compose, COMPOSE,
} = require('../src/redux-modules.js');


const KEY = 'someKey';
const VALUE = 'some value';



describe('set', () => {
  it('creates an action with the correct type', () => {
    const action = set(VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(SET);
  });

  it('creates an action with the correct value', () => {
    const action = set(VALUE);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});

describe('entry', () => {
  it('creates an action with the correct type', () => {
    const action = entry(KEY, VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(ENTRY);
  });

  it('creates an action with the correct properties', () => {
    const action = entry(KEY, VALUE);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.key).toBe(KEY);
    expect(action.payload.value).toBe(VALUE);
  });
});

describe('remove', () => {
  it('creates an action with the correct type', () => {
    const action = remove(KEY);
    expect(action).toBeTruthy();
    expect(action.type).toBe(REMOVE);
  });

  it('creates an action with the correct properties', () => {
    const action = remove(KEY);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.key).toBe(KEY);
  });
});

describe('push', () => {
  it('creates an action with the correct type', () => {
    const action = push(VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(PUSH);
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
    expect(action.type).toBe(UNSHIFT);
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
    expect(action.type).toBe(POP);
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
    expect(action.type).toBe(SHIFT);
  });

  it('creates an action with no payload', () => {
    const action = shift();
    expect(action).toBeTruthy();
    expect(action.payload).toBeUndefined();
  });
});

describe('compose', () => {
  const ACTION_1 = { type: 'ACTION_1' };
  const ACTION_2 = { type: 'ACTION_2' };
  const ACTION_3 = { type: 'ACTION_3' };
  let action = null;

  beforeEach(() => {
    action = compose(ACTION_1, ACTION_2, ACTION_3);
  });

  it('creates an action with the correct type', () => {
    expect(action).toBeTruthy();
    expect(action.type).toBe(COMPOSE);
  });

  it('creates an action with an array of actions in the payload', () => {
    expect(action.payload).toBeTruthy();
    expect(action.payload.actions).toEqual([ACTION_1, ACTION_2, ACTION_3]);
  });
});
