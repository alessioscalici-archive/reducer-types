
const {
  set, ACTION_TYPE_SET,
  entry, ACTION_TYPE_ENTRY,
  remove, ACTION_TYPE_REMOVE,
  push, ACTION_TYPE_PUSH,
  unshift, ACTION_TYPE_UNSHIFT,
  pop, ACTION_TYPE_POP,
  shift, ACTION_TYPE_SHIFT,
  compose, ACTION_TYPE_COMPOSED,
} = require('../src/actions');


const KEY = 'someKey';
const VALUE = 'some value';



describe('set', () => {
  it('creates an action with the correct type', () => {
    const action = set(VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(ACTION_TYPE_SET);
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
    expect(action.type).toBe(ACTION_TYPE_ENTRY);
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
    expect(action.type).toBe(ACTION_TYPE_REMOVE);
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
    expect(action.type).toBe(ACTION_TYPE_COMPOSED);
  });

  it('creates an action with an array of actions in the payload', () => {
    expect(action.payload).toBeTruthy();
    expect(action.payload.actions).toEqual([ACTION_1, ACTION_2, ACTION_3]);
  });
});
