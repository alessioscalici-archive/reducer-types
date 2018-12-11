require('../../mocks/jestMatchers');

const actionObject = require('../../../src/types/object/set');

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

    it('Array, should set null', () => {
      const newState = actionReducer(oldState, { type, payload: { value: [] } });
      expect(newState).toBe(null);
    });
  });


  describe('when trying to set an object', () => {
    const oldState = null;
    const VALUE = { a: 'b' };

    it('should set the state', () => {
      const newState = actionReducer(oldState, { type, payload: { value: VALUE } });
      expect(newState).toBe(VALUE);
    });
  });
});

describe('action creator', () => {
  const VALUE = { a: 'b' };

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
