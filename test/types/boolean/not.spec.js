require('../../mocks/jestMatchers');

const actionObject = require('../../../src/types/boolean/not');

const { type, handler, creator } = actionObject;
const actionReducer = handler;


it('exports a valid action object', () => {
  expect(actionObject).toBeValidActionObject();
});

describe('action handler', () => {
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
});


describe('action creator', () => {
  it('creates an action with the correct type', () => {
    const action = creator();
    expect(action).toBeTruthy();
    expect(action.type).toBe(type);
  });

  it('creates an action with the correct properties', () => {
    const action = creator();
    expect(action).toBeTruthy();
    expect(action.payload).toBeUndefined();
  });
});
