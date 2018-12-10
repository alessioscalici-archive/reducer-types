

const { actionHandlers, actionTypes } = require('../../../../src/types/boolean');

const type = actionTypes.not;
const actionReducer = actionHandlers[type];


describe('when current state is TRUE', () => {
  const oldState = true;

  it('should return FALSE', () => {
    const newState = actionReducer(oldState, { type });
    expect(newState).toBe(false);
  });
});


describe('when current state is FALSE', () => {
  const oldState = false;

  it('should return TRUE', () => {
    const newState = actionReducer(oldState, { type });
    expect(newState).toBe(true);
  });
});

describe('when current state is NULL', () => {
  const oldState = null;

  it('should return NULL', () => {
    const newState = actionReducer(oldState, { type });
    expect(newState).toBe(null);
  });
});
