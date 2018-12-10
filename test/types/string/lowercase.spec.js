
require('../../mocks/jestMatchers');

const actionObject = require('../../../src/types/string/lowercase');

const { type, handler, creator } = actionObject;
const actionReducer = handler;


it('exports a valid action object', () => {
  expect(actionObject).toBeValidActionObject();
});


describe('action handler', () => {
  describe('when current state is a string', () => {
    const oldState = 'Hello, World!';

    it('should return the lowercase string', () => {
      const newState = actionReducer(oldState, { type });
      expect(newState).toBe('hello, world!');
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
