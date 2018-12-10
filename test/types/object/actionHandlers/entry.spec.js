

const { actionHandlers, actionTypes } = require('../../../../src/basic-types/object');

const type = actionTypes.entry;
const actionReducer = actionHandlers[type];

const KEY = 'someKey';
const VALUE = { hello: 'world' };

let newState;
let oldState;

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
