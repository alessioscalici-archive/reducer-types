
const { DEFAULT_ACTION_MAP, PUSH } = require('../../src/redux-modules.js');


const actionReducer = DEFAULT_ACTION_MAP[PUSH];

const VALUE = { newKey: 'newValue' };
const oldState = [ { key: 'value' } ];

let newState;


describe('when the state is null', () => {
  beforeEach(() => {
    newState = actionReducer(null, { type: PUSH, payload: { value: VALUE } });
  });

  it('returns null (does not crash)', () => {
    expect(newState).toBe(null);
  });
});

describe('when the state is not an array', () => {
  const notAnArray = { something: 'is wrong!' };
  beforeEach(() => {
    newState = actionReducer(notAnArray, { type: PUSH, payload: { value: VALUE } });
  });

  it('returns the old state (does not crash)', () => {
    expect(newState).toBe(notAnArray);
  });
});


describe('when state is an Array', () => {
  beforeEach(() => {
    newState = actionReducer(oldState, { type: PUSH, payload: { value: VALUE } });
  });

  it('returns a new state (immutability)', () => {
    expect(oldState).not.toBe(newState);
  });

  it('new state length will be incremented by 1', () => {
    expect(newState.length).toBe(oldState.length + 1);
  });

  it('last element in new state will be the action value', () => {
    expect(newState[newState.length - 1]).toBe(VALUE);
  });

  it('first part of the new state will equal the old state', () => {
    expect(newState.slice(0, newState.length-1)).toEqual(oldState);
  });
});
