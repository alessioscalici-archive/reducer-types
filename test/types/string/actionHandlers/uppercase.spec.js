

const { actionHandlers, actionTypes } = require('../../../../src/basic-types/string');

const type = actionTypes.uppercase;
const actionReducer = actionHandlers[type];


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
