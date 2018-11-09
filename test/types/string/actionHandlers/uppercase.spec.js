

const { actionHandlers, actionTypes: { ACTION_TYPE_UPPERCASE } } = require('../../../../src/types/string');

const actionReducer = actionHandlers[ACTION_TYPE_UPPERCASE];


describe('when current state is a string', () => {
  const oldState = 'Hello, world!';

  it('should return the uppercase string', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_UPPERCASE });
    expect(newState).toBe('HELLO, WORLD!');
  });
});


describe('when current state is NULL', () => {
  const oldState = null;

  it('should return NULL', () => {
    let newState = actionReducer(oldState, { type: ACTION_TYPE_UPPERCASE });
    expect(newState).toBe(null);
  });
});
