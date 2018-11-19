

const { actionHandlers, actionTypes: { ACTION_TYPE_ADD } } = require('../../../../src/types/number');

const actionReducer = actionHandlers[ACTION_TYPE_ADD];


describe('when current state is 0', () => {
  const oldState = 0;

  it('applying a positive number should return the same number', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_ADD, payload: { value: 42 } });
    expect(newState).toBe(42);
  });

  it('applying a negative number should return the same number', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_ADD, payload: { value: -42 } });
    expect(newState).toBe(-42);
  });

  it('applying zero should return zero', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_ADD, payload: { value: 0 } });
    expect(newState).toBe(0);
  });
});


describe('when current state is a positive number', () => {
  const oldState = 10;

  it('applying a positive number should return the sum (state + value)', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_ADD, payload: { value: 42 } });
    expect(newState).toBe(52);
  });

  it('applying a negative number should return the sum (state + (-value))', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_ADD, payload: { value: -42 } });
    expect(newState).toBe(-32);
  });

  it('applying zero should return the current state', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_ADD, payload: { value: 0 } });
    expect(newState).toBe(oldState);
  });
});


describe('when current state is NULL', () => {
  const oldState = null;

  it('applying a number should return NULL', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_ADD, payload: { value: 42 } });
    expect(newState).toBe(null);
  });

  it('applying 0 should return NULL', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_ADD, payload: { value: 0 } });
    expect(newState).toBe(null);
  });
});
