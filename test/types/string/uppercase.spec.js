
require('../../mocks/jestMatchers');

const actionObject = require('../../../src/types/string/uppercase');

const { type, handler, creator } = actionObject;
const actionReducer = handler;


describe('action handler', () => {
  describe('when current state is a string', () => {
    const oldState = 'Hello, world!';

    it('should return the uppercase string', () => {
      const newState = actionReducer(oldState, { type });
      expect(newState).toBe('HELLO, WORLD!');
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
