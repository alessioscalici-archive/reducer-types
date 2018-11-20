
const { actionHandlers, actionTypes: { ACTION_TYPE_UNSHIFT } } = require('../../../../src/basic-types/array');


const actionReducer = actionHandlers[ACTION_TYPE_UNSHIFT];

const VALUE = { newKey: 'newValue' };
const oldState = [{ key: 'value' }];

let newState;


describe('when the state is null', () => {
  beforeEach(() => {
    newState = actionReducer(null, { type: ACTION_TYPE_UNSHIFT, payload: { value: VALUE } });
  });

  it('returns null (does not crash)', () => {
    expect(newState).toBe(null);
  });
});


describe('when the state is not an Array', () => {
  const notAnArray = { something: 'is wrong!' };

  it('throws an error', () => {
    expect(() => {
      actionReducer(notAnArray, { type: ACTION_TYPE_UNSHIFT });
    }).toThrow();
  });
});


describe('when state is an Array', () => {
  beforeEach(() => {
    newState = actionReducer(oldState, { type: ACTION_TYPE_UNSHIFT, payload: { value: VALUE } });
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
