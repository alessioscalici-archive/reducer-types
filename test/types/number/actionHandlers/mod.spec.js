

const { actionHandlers, actionTypes: { ACTION_TYPE_MOD } } = require('../../../../src/types/number');

const actionReducer = actionHandlers[ACTION_TYPE_MOD];


describe('when current state is 0', () => {
  const oldState = 0;

  it('applying a positive number should return zero', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_MOD, payload: { value: 42 } });
    expect(newState).toBe(0);
  });

  it('applying a negative number should return zero', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_MOD, payload: { value: -42 } });
    expect(newState).toBe(0);
  });
});


describe('when current state is a positive number', () => {
  const oldState = 42;

  it('applying a positive number should return the module (state % value)', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_MOD, payload: { value: 5 } });
    expect(newState).toBe(oldState % 5);
  });

  it('applying a negative number should return the division (state / (-value))', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_MOD, payload: { value: -5 } });
    expect(newState).toBe(oldState % -5);
  });
});


describe('when current state is NULL', () => {
  const oldState = null;

  it('applying a number should return NULL', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_MOD, payload: { value: 42 } });
    expect(newState).toBe(null);
  });

  it('applying 0 should return NULL', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_MOD, payload: { value: 0 } });
    expect(newState).toBe(null);
  });
});
