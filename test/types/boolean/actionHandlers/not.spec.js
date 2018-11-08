

const { actionHandlers, actionTypes: { ACTION_TYPE_NOT } } = require('../../../../src/types/boolean');

const actionReducer = actionHandlers[ACTION_TYPE_NOT];


describe('when current state is TRUE', () => {
  const oldState = true;

  it('should return FALSE', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_NOT });
    expect(newState).toBe(false);
  });
});


describe('when current state is FALSE', () => {
  const oldState = false;

  it('should return TRUE', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_NOT });
    expect(newState).toBe(true);
  });
});

describe('when current state is NULL', () => {
  const oldState = null;

  it('should return NULL', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_NOT });
    expect(newState).toBe(null);
  });
});
