require('../../mocks/jestMatchers');

const actionObject = require('../../../src/types/boolean/and');

const { type, handler, creator } = actionObject;
const actionReducer = handler;


it('exports a valid action object', () => {
  expect(actionObject).toBeValidActionObject();
});

describe('action handler', () => {
  describe('when current state is TRUE', () => {
    const oldState = true;

    it('applying TRUE should return TRUE', () => {
      const newState = actionReducer(oldState, { type, payload: { value: true } });
      expect(newState).toBe(true);
    });

    it('applying FALSE should return FALSE', () => {
      const newState = actionReducer(oldState, { type, payload: { value: false } });
      expect(newState).toBe(false);
    });
  });


  describe('when current state is FALSE', () => {
    const oldState = false;

    it('applying TRUE should return FALSE', () => {
      const newState = actionReducer(oldState, { type, payload: { value: true } });
      expect(newState).toBe(false);
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
});

describe('action creator', () => {
  it('creates an action with the correct type', () => {
    const action = creator(true);
    expect(action).toBeTruthy();
    expect(action.type).toBe(type);
  });

  it('creates an action with the correct properties', () => {
    const action = creator(true);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(true);
  });
});
