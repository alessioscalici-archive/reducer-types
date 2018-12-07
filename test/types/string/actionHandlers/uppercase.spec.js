

const { actionHandlers, actionTypes } = require('../../../../src/basic-types/string');

const actionReducer = actionHandlers[actionTypes.uppercase];


describe('when current state is a string', () => {
  const oldState = 'Hello, world!';

  it('should return the uppercase string', () => {
    const newState = actionReducer(oldState, { type: actionTypes.uppercase });
    expect(newState).toBe('HELLO, WORLD!');
  });
});


describe('when current state is NULL', () => {
  const oldState = null;

  it('should return NULL', () => {
    const newState = actionReducer(oldState, { type: actionTypes.uppercase });
    expect(newState).toBe(null);
  });
});
