

const { actionHandlers, actionTypes: { ACTION_TYPE_DIVIDE } } = require('../../../../src/basic-types/number');

const actionReducer = actionHandlers[ACTION_TYPE_DIVIDE];


describe('when current state is 0', () => {
  const oldState = 0;

  it('applying a positive number should return zero', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_DIVIDE, payload: { value: 42 } });
    expect(newState).toBe(0);
  });

  it('applying a negative number should return zero', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_DIVIDE, payload: { value: -42 } });
    expect(newState).toBe(-0);
  });
});


describe('when current state is a positive number', () => {
  const oldState = 50;

  it('applying a positive number should return the division (state / value)', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_DIVIDE, payload: { value: 5 } });
    expect(newState).toBe(oldState / 5);
  });

  it('applying a negative number should return the division (state / (-value))', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_DIVIDE, payload: { value: -5 } });
    expect(newState).toBe(oldState / -5);
  });
});


describe('when current state is NULL', () => {
  const oldState = null;

  it('applying a number should return NULL', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_DIVIDE, payload: { value: 42 } });
    expect(newState).toBe(null);
  });

  it('applying 0 should return NULL', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_DIVIDE, payload: { value: 0 } });
    expect(newState).toBe(null);
  });
});
