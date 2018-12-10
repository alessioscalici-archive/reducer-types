

const { actionHandlers, actionTypes } = require('../../../../src/basic-types/number');

const type = actionTypes.not;
const actionReducer = actionHandlers[type];


describe('when current state is 0', () => {
  const oldState = 0;

  it('should return 0', () => {
    const newState = actionReducer(oldState, { type });
    expect(newState).toBe(-0);
  });
});


describe('when current state is a positive number', () => {
  const oldState = 42;

  it('should return the current state, negative', () => {
    const newState = actionReducer(oldState, { type });
    expect(newState).toBe(-42);
  });
});

describe('when current state is a negative number', () => {
  const oldState = -42;

  it('should return the current state, positive', () => {
    const newState = actionReducer(oldState, { type });
    expect(newState).toBe(42);
  });
});


describe('when current state is NULL', () => {
  const oldState = null;

  it('applying a number should return NULL', () => {
    const newState = actionReducer(oldState, { type });
    expect(newState).toBe(null);
  });

  it('applying 0 should return NULL', () => {
    const newState = actionReducer(oldState, { type });
    expect(newState).toBe(null);
  });
});
