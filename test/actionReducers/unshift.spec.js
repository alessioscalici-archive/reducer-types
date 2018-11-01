
const { DEFAULT_ACTION_MAP, UNSHIFT } = require('../../index');
const { TYPE_ARRAY } = require('../../src/types');


const actionReducer = DEFAULT_ACTION_MAP[TYPE_ARRAY][UNSHIFT];

const VALUE = { newKey: 'newValue' };
const oldState = [ { key: 'value' } ];

let newState;


describe('when the state is null', () => {
  beforeEach(() => {
    newState = actionReducer(null, { type: UNSHIFT, payload: { value: VALUE } });
  });

  it('returns null (does not crash)', () => {
    expect(newState).toBe(null);
  });
});

describe('when the state is not an array', () => {
  const notAnArray = { something: 'is wrong!' };
  beforeEach(() => {
    newState = actionReducer(notAnArray, { type: UNSHIFT, payload: { value: VALUE } });
  });

  it('returns the old state (does not crash)', () => {
    expect(newState).toBe(notAnArray);
  });
});


describe('when state is an Array', () => {
  beforeEach(() => {
    newState = actionReducer(oldState, { type: UNSHIFT, payload: { value: VALUE } });
  });

  it('returns a new state (immutability)', () => {
    expect(oldState).not.toBe(newState);
  });

  it('new state length will be incremented by 1', () => {
    expect(newState.length).toBe(oldState.length + 1);
  });

  it('first element in new state will be the action value', () => {
    expect(newState[0]).toBe(VALUE);
  });

  it('first part of the new state will equal the old state', () => {
    expect(newState.slice(1)).toEqual(oldState);
  });
});
