require('../../mocks/jestMatchers');

const actionObject = require('../../../src/types/boolean/set');

const { type, handler, creator } = actionObject;
const actionReducer = handler;


it('exports a valid action object', () => {
  expect(actionObject).toBeValidActionObject();
});


describe('action handler', () => {
  describe('when trying to set a non-boolean type', () => {
    const oldState = 0;

    it('string, should set null', () => {
      const newState = actionReducer(oldState, { type, payload: { value: '42' } });
      expect(newState).toBe(null);
    });

    it('null, should set null', () => {
      const newState = actionReducer(oldState, { type, payload: { value: null } });
      expect(newState).toBe(null);
    });

    it('undefined, should set null', () => {
      const newState = actionReducer(oldState, { type, payload: { } });
      expect(newState).toBe(null);
    });

    it('NaN, should set null', () => {
      const newState = actionReducer(oldState, { type, payload: { value: NaN } });
      expect(newState).toBe(null);
    });
  });


  describe('when trying to set a boolean type', () => {
    const oldState = null;

    it('applying true should set the state to true', () => {
      const newState = actionReducer(oldState, { type, payload: { value: true } });
      expect(newState).toBe(true);
    });

    it('applying false should set the state to false', () => {
      const newState = actionReducer(oldState, { type, payload: { value: false } });
      expect(newState).toBe(false);
    });
  });
});

describe('action creator', () => {
  const VALUE = true;

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
