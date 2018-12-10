

const { actionHandlers, actionTypes } = require('../../../../src/basic-types/number');

const type = actionTypes.or;
const actionReducer = actionHandlers[type];

/* eslint-disable no-bitwise */

describe('when current state is 0', () => {
  const oldState = 0;

  it('applying a positive number should return the value', () => {
    const newState = actionReducer(oldState, { type, payload: { value: 42 } });
    expect(newState).toBe(42);
  });

  it('applying a negative number should return the value', () => {
    const newState = actionReducer(oldState, { type, payload: { value: -42 } });
    expect(newState).toBe(-42);
  });
});


describe('when current state is a positive number', () => {
  const oldState = 50;

  it('applying a positive number should return the bitwise OR (state | value)', () => {
    const newState = actionReducer(oldState, { type, payload: { value: 5 } });
    expect(newState).toBe(oldState | 5);
  });

  it('applying a negative number should return the bitwise OR (state | (-value))', () => {
    const newState = actionReducer(oldState, { type, payload: { value: -5 } });
    expect(newState).toBe(oldState | -5);
  });
});


describe('when current state is NULL', () => {
  const oldState = null;

  it('applying a number should return NULL', () => {
    const newState = actionReducer(oldState, { type, payload: { value: 42 } });
    expect(newState).toBe(null);
  });

  it('applying 0 should return NULL', () => {
    const newState = actionReducer(oldState, { type, payload: { value: 0 } });
    expect(newState).toBe(null);
  });
});
/* eslint-enable no-bitwise */
