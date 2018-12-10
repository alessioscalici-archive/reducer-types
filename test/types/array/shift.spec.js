require('../../mocks/jestMatchers');

const actionObject = require('../../../src/types/array/shift');

const { type, handler, creator } = actionObject;
const actionReducer = handler;

const oldState = [{ key: 'value' }, { newKey: 'newValue' }];

let newState;


it('exports a valid action object', () => {
  expect(actionObject).toBeValidActionObject();
});

describe('action handler', () => {
  describe('when the state is null', () => {
    beforeEach(() => {
      newState = actionReducer(null, { type });
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
      newState = actionReducer(oldState, { type });
    });

    it('returns a new state (immutability)', () => {
      expect(oldState).not.toBe(newState);
    });

    it('new state length will be deremented by 1', () => {
      expect(newState.length).toBe(oldState.length - 1);
    });

    it('the new state will equal last part of the old state', () => {
      expect(newState).toEqual(oldState.slice(1));
    });
  });
});

describe('action creator', () => {
  it('creates an action with the correct type', () => {
    const action = creator();
    expect(action).toBeTruthy();
    expect(action.type).toBe(type);
  });

  it('creates an action with no payload', () => {
    const action = creator();
    expect(action).toBeTruthy();
    expect(action.payload).toBeUndefined();
  });
});
