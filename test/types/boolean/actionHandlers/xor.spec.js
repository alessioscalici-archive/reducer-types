

const { actionHandlers, actionTypes: { ACTION_TYPE_XOR } } = require('../../../../src/types/boolean');

const actionReducer = actionHandlers[ACTION_TYPE_XOR];


describe('when current state is TRUE', () => {
  const oldState = true;

  it('applying TRUE should return FALSE', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_XOR, payload: { value: true } });
    expect(newState).toBe(false);
  });

  it('applying FALSE should return TRUE', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_XOR, payload: { value: false } });
    expect(newState).toBe(true);
  });
});


describe('when current state is FALSE', () => {
  const oldState = false;

  it('applying TRUE should return TRUE', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_XOR, payload: { value: true } });
    expect(newState).toBe(true);
  });

  it('applying FALSE should return FALSE', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_XOR, payload: { value: false } });
    expect(newState).toBe(false);
  });
});

describe('when current state is NULL', () => {
  const oldState = null;

  it('applying TRUE should return NULL', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_XOR, payload: { value: true } });
    expect(newState).toBe(null);
  });

  it('applying FALSE should return NULL', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_XOR, payload: { value: false } });
    expect(newState).toBe(null);
  });
});
