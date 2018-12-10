require('../../mocks/jestMatchers');

const actionObject = require('../../../src/types/object/remove');

const { type, handler, creator } = actionObject;
const actionReducer = handler;


const KEY = 'someKey';

const oldState = {
  key1: { a: 1 },
  key2: { b: 2 },
  [KEY]: { please: 'remove me!' },
};

let newState;


it('exports a valid action object', () => {
  expect(actionObject).toBeValidActionObject();
});


describe('action handler', () => {
  describe('when the key does not exist', () => {
    beforeEach(() => {
      newState = actionReducer(oldState, { type, payload: { key: 'NOT_EXISTING' } });
    });

    it('returns the old state (immutability)', () => {
      expect(oldState).toBe(newState);
    });
  });

  describe('when the state is null', () => {
    beforeEach(() => {
      newState = actionReducer(null, { type, payload: { key: 'NOT_EXISTING' } });
    });

    it('returns the old state (immutability)', () => {
      expect(newState).toBe(null);
    });
  });


  describe('when the key does exist', () => {
    beforeEach(() => {
      newState = actionReducer(oldState, { type, payload: { key: KEY } });
    });

    it('returns a new state (immutability)', () => {
      expect(oldState).not.toBe(newState);
    });

    it('new state does not contain the key', () => {
      expect(KEY in newState).toBe(false);
    });
  });
});

describe('action creator', () => {
  it('creates an action with the correct type', () => {
    const action = creator(KEY);
    expect(action).toBeTruthy();
    expect(action.type).toBe(type);
  });

  it('creates an action with the correct properties', () => {
    const action = creator(KEY);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.key).toBe(KEY);
  });
});
