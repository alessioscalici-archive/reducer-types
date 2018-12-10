
const { actionHandlers, actionTypes } = require('../../../../src/basic-types/array');

const type = actionTypes.shift;
const actionReducer = actionHandlers[type];

const oldState = [{ key: 'value' }, { newKey: 'newValue' }];

let newState;


describe('when the state is null', () => {
  beforeEach(() => {
    newState = actionReducer(null, { type });
  });

  it('returns null (does not crash)', () => {
    expect(newState).toBe(null);
  });
});


describe('when the state is not an Array', () => {
  const notAnArray = { something: 'is wrong!' };

  it('throws an error', () => {
    expect(() => {
      actionReducer(notAnArray, { type });
    }).toThrow();
  });
});


describe('when state is an Array', () => {
  beforeEach(() => {
    newState = actionReducer(oldState, { type });
  });

  it('returns a new state (immutability)', () => {
    expect(oldState).not.toBe(newState);
  });

  it('new state length will be deremented by 1', () => {
    expect(newState.length).toBe(oldState.length - 1);
  });

  it('the new state will equal last part of the old state', () => {
    expect(newState).toEqual(oldState.slice(1));
  });
});
