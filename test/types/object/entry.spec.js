require('../../mocks/jestMatchers');

const actionObject = require('../../../src/types/object/entry');

const { type, handler, creator } = actionObject;
const actionReducer = handler;


const KEY = 'someKey';
const VALUE = { hello: 'world' };

let newState;
let oldState;


it('exports a valid action object', () => {
  expect(actionObject).toBeValidActionObject();
});


describe('action handler', () => {
  describe('setting a value on a new key', () => {
    beforeEach(() => {
      oldState = { keyA: 'valueA', keyB: 'valueB' };
      newState = actionReducer(
        oldState, { type, payload: { key: KEY, value: VALUE } },
      );
    });

    it('returns a new state (immutability)', () => {
      expect(oldState).not.toBe(newState);
    });

    it('the new state contains all the old state entries', () => {
      Object.keys(oldState).forEach((key) => {
        expect(newState[key]).toBe(oldState[key]);
      });
    });

    it('the new state contains the new entry', () => {
      expect(newState[KEY]).toBe(VALUE);
    });

    it('the new state contains one entry more', () => {
      const oldKeyCount = Object.keys(oldState).length;
      const newKeyCount = Object.keys(newState).length;

      expect(newKeyCount).toBe(oldKeyCount + 1);
    });
  });


  describe('setting a new value to an existing key', () => {
    beforeEach(() => {
      oldState = { keyA: 'valueA', keyB: 'valueB', [KEY]: 'valueC' };
      newState = actionReducer(
        oldState, { type, payload: { key: KEY, value: VALUE } },
      );
    });

    it('returns a new state (immutability)', () => {
      expect(oldState).not.toBe(newState);
    });

    it('the new state entries are the same, except the targeted one', () => {
      Object.keys(oldState)
        .filter(key => key !== KEY)
        .forEach((key) => {
          expect(newState[key]).toBe(oldState[key]);
        });
    });

    it('the new state contains the new entry', () => {
      expect(newState[KEY]).toBe(VALUE);
    });

    it('the new state has the same number of entries as the old state', () => {
      const oldKeyCount = Object.keys(oldState).length;
      const newKeyCount = Object.keys(newState).length;

      expect(newKeyCount).toBe(oldKeyCount);
    });
  });

  describe('setting an already existing key/value pair', () => {
    beforeEach(() => {
      oldState = { keyA: 'valueA', keyB: 'valueB', [KEY]: VALUE };
      newState = actionReducer(
        oldState, { type, payload: { key: KEY, value: VALUE } },
      );
    });

    it('returns the old state', () => {
      expect(newState).toBe(oldState);
    });
  });
});

describe('action creator', () => {
  it('creates an action with the correct type', () => {
    const action = creator(KEY, VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(type);
  });

  it('creates an action with the correct properties', () => {
    const action = creator(KEY, VALUE);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.key).toBe(KEY);
    expect(action.payload.value).toBe(VALUE);
  });
});
