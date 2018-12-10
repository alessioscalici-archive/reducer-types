require('../../mocks/jestMatchers');

const actionObject = require('../../../src/types/array/unshift');

const { type, handler, creator } = actionObject;
const actionReducer = handler;

const VALUE = { newKey: 'newValue' };
const oldState = [{ key: 'value' }];

let newState;


it('exports a valid action object', () => {
  expect(actionObject).toBeValidActionObject();
});

describe('action handler', () => {
  describe('when the state is null', () => {
    beforeEach(() => {
      newState = actionReducer(null, { type, payload: { value: VALUE } });
    });

    it('returns null (does not crash)', () => {
      expect(newState).toBe(null);
    });
  });


  describe('when the state is not an Array', () => {
    const notAnArray = { something: 'is wrong!' };

    it('throws an error', () => {
      expect(() => {
        actionReducer(notAnArray, { type });
      }).toThrow();
    });
  });


  describe('when state is an Array', () => {
    beforeEach(() => {
      newState = actionReducer(oldState, { type, payload: { value: VALUE } });
    });

    it('returns a new state (immutability)', () => {
      expect(oldState).not.toBe(newState);
    });

    it('new state length will be incremented by 1', () => {
      expect(newState.length).toBe(oldState.length + 1);
    });

    it('first element in new state will be the action value', () => {
      expect(newState[0]).toBe(VALUE);
    });

    it('first part of the new state will equal the old state', () => {
      expect(newState.slice(1)).toEqual(oldState);
    });
  });
});

describe('unshift', () => {
  it('creates an action with the correct type', () => {
    const action = creator(VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(type);
  });

  it('creates an action with the correct value', () => {
    const action = creator(VALUE);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.value).toBe(VALUE);
  });
});
