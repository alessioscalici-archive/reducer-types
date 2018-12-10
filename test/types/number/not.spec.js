require('../../mocks/jestMatchers');

const actionObject = require('../../../src/types/number/not');

const { type, handler, creator } = actionObject;
const actionReducer = handler;


it('exports a valid action object', () => {
  expect(actionObject).toBeValidActionObject();
});


describe('action handler', () => {
  describe('when current state is 0', () => {
    const oldState = 0;

    it('should return 0', () => {
      const newState = actionReducer(oldState, { type });
      expect(newState).toBe(-0);
    });
  });


  describe('when current state is a positive number', () => {
    const oldState = 42;

    it('should return the current state, negative', () => {
      const newState = actionReducer(oldState, { type });
      expect(newState).toBe(-42);
    });
  });

  describe('when current state is a negative number', () => {
    const oldState = -42;

    it('should return the current state, positive', () => {
      const newState = actionReducer(oldState, { type });
      expect(newState).toBe(42);
    });
  });


  describe('when current state is NULL', () => {
    const oldState = null;

    it('applying a number should return NULL', () => {
      const newState = actionReducer(oldState, { type });
      expect(newState).toBe(null);
    });

    it('applying 0 should return NULL', () => {
      const newState = actionReducer(oldState, { type });
      expect(newState).toBe(null);
    });
  });
});


describe('action creator', () => {
  it('creates an action with the correct type', () => {
    const action = creator();
    expect(action.type).toBe(type);
  });

  it('creates an action with no payload', () => {
    const action = creator();
    expect(action.payload).toBeUndefined();
  });
});
