

const { actionHandlers, actionTypes: { ACTION_TYPE_LOWERCASE } } = require('../../../../src/basic-types/string');

const actionReducer = actionHandlers[ACTION_TYPE_LOWERCASE];


describe('when current state is a string', () => {
  const oldState = 'Hello, World!';

  it('should return the lowercase string', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_LOWERCASE });
    expect(newState).toBe('hello, world!');
  });
});


describe('when current state is NULL', () => {
  const oldState = null;

  it('should return NULL', () => {
    const newState = actionReducer(oldState, { type: ACTION_TYPE_LOWERCASE });
    expect(newState).toBe(null);
  });
});
