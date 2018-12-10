

const { actionHandlers, actionTypes } = require('../../../../src/basic-types/boolean');

const type = actionTypes.or;
const actionReducer = actionHandlers[type];


describe('when current state is TRUE', () => {
  const oldState = true;

  it('applying TRUE should return TRUE', () => {
    const newState = actionReducer(oldState, { type, payload: { value: true } });
    expect(newState).toBe(true);
  });

  it('applying FALSE should return TRUE', () => {
    const newState = actionReducer(oldState, { type, payload: { value: false } });
    expect(newState).toBe(true);
  });
});


describe('when current state is FALSE', () => {
  const oldState = false;

  it('applying TRUE should return TRUE', () => {
    const newState = actionReducer(oldState, { type, payload: { value: true } });
    expect(newState).toBe(true);
  });

  it('applying FALSE should return FALSE', () => {
    const newState = actionReducer(oldState, { type, payload: { value: false } });
    expect(newState).toBe(false);
  });
});

describe('when current state is NULL', () => {
  const oldState = null;

  it('applying TRUE should return NULL', () => {
    const newState = actionReducer(oldState, { type, payload: { value: true } });
    expect(newState).toBe(null);
  });

  it('applying FALSE should return NULL', () => {
    const newState = actionReducer(oldState, { type, payload: { value: false } });
    expect(newState).toBe(null);
  });
});
