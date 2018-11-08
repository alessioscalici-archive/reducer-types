

const { actionHandlers, actionTypes: { ACTION_TYPE_NEGATE } } = require('../../../../src/types/number');

const actionReducer = actionHandlers[ACTION_TYPE_NEGATE];


describe('when current state is 0', () => {
  const oldState = 0;

  it('should return 0', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_NEGATE });
    expect(newState).toBe(-0);
  });
});


describe('when current state is a positive number', () => {
  const oldState = 42;

  it('should return the current state, negative', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_NEGATE });
    expect(newState).toBe(-42);
  });
});

describe('when current state is a negative number', () => {
  const oldState = -42;

  it('should return the current state, positive', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_NEGATE });
    expect(newState).toBe(42);
  });
});


describe('when current state is NULL', () => {
  const oldState = null;

  it('applying a number should return NULL', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_NEGATE });
    expect(newState).toBe(null);
  });

  it('applying 0 should return NULL', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_NEGATE });
    expect(newState).toBe(null);
  });
});
