

const { actionHandlers, actionTypes } = require('../../../../src/basic-types/string');

const actionReducer = actionHandlers[actionTypes.lowercase];


describe('when current state is a string', () => {
  const oldState = 'Hello, World!';

  it('should return the lowercase string', () => {
    const newState = actionReducer(oldState, { type: actionTypes.lowercase });
    expect(newState).toBe('hello, world!');
  });
});


describe('when current state is NULL', () => {
  const oldState = null;

  it('should return NULL', () => {
    const newState = actionReducer(oldState, { type: actionTypes.lowercase });
    expect(newState).toBe(null);
  });
});
