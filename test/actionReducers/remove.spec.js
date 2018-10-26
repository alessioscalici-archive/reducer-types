
const { DEFAULT_ACTION_MAP, REMOVE } = require('../../index');


const actionReducer = DEFAULT_ACTION_MAP[REMOVE];

const KEY = 'someKey';

const oldState = {
  key1: { a: 1 },
  key2: { b: 2 },
  [KEY]: { please: 'remove me!' }
};

let newState;

describe('when the key does not exist', () => {
  beforeEach(() => {
    newState = actionReducer(oldState, { type: REMOVE, payload: { key: 'NOT_EXISTING' } });
  });

  it('returns the old state (immutability)', () => {
    expect(oldState).toBe(newState);
  });
});

describe('when the state is null', () => {
  beforeEach(() => {
    newState = actionReducer(null, { type: REMOVE, payload: { key: 'NOT_EXISTING' } });
  });

  it('returns the old state (immutability)', () => {
    expect(newState).toBe(null);
  });
});


describe('when the key does exist', () => {
  beforeEach(() => {
    newState = actionReducer(oldState, { type: REMOVE, payload: { key: KEY } });
  });

  it('returns a new state (immutability)', () => {
    expect(oldState).not.toBe(newState);
  });

  it('new state does not contain the key', () => {
    expect(newState.hasOwnProperty(KEY)).toBe(false);
  });
});
