require('../../mocks/jestMatchers');

const actionObject = require('../../../src/types/number/xor');

const { type, handler, creator } = actionObject;
const actionReducer = handler;


it('exports a valid action object', () => {
  expect(actionObject).toBeValidActionObject();
});

/* eslint-disable no-bitwise */
describe('action handler', () => {
  describe('when current state is 0', () => {
    const oldState = 0;

    it('applying a positive number should return the value', () => {
      const newState = actionReducer(oldState, { type, payload: { value: 42 } });
      expect(newState).toBe(0 ^ 42);
    });

    it('applying a negative number should return the value', () => {
      const newState = actionReducer(oldState, { type, payload: { value: -42 } });
      expect(newState).toBe(0 ^ -42);
    });
  });


  describe('when current state is a positive number', () => {
    const oldState = 50;

    it('applying a positive number should return the bitwise XOR (state ^ value)', () => {
      const newState = actionReducer(oldState, { type, payload: { value: 5 } });
      expect(newState).toBe(oldState ^ 5);
    });

    it('applying a negative number should return the bitwise XOR (state ^ (-value))', () => {
      const newState = actionReducer(oldState, { type, payload: { value: -5 } });
      expect(newState).toBe(oldState ^ -5);
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
});
/* eslint-enable no-bitwise */

describe('action creator', () => {
  const VALUE = 42;

  it('creates an action with the correct type', () => {
    const action = creator(VALUE);
    expect(action.type).toBe(type);
  });

  it('creates an action with the correct properties', () => {
    const action = creator(VALUE);
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});
