

const { actionHandlers, actionTypes } = require('../../../../src/basic-types/string');

const type = actionTypes.lowercase;
const actionReducer = actionHandlers[type];


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
