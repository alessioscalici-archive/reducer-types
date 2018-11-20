

const { actionHandlers, actionTypes: { ACTION_TYPE_NOT } } = require('../../../../src/basic-types/boolean');

const actionReducer = actionHandlers[ACTION_TYPE_NOT];


describe('when current state is TRUE', () => {
  const oldState = true;

  it('should return FALSE', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_NOT });
    expect(newState).toBe(false);
  });
});


describe('when current state is FALSE', () => {
  const oldState = false;

  it('should return TRUE', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_NOT });
    expect(newState).toBe(true);
  });
});

describe('when current state is NULL', () => {
  const oldState = null;

  it('should return NULL', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_NOT });
    expect(newState).toBe(null);
  });
});
