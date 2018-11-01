
const { createReducer } = require('../src/redules');
const {
  ACTION_TYPE_SET, ACTION_TYPE_ENTRY, ACTION_TYPE_REMOVE, ACTION_TYPE_PUSH, ACTION_TYPE_POP, ACTION_TYPE_SHIFT, ACTION_TYPE_UNSHIFT, ACTION_TYPE_COMPOSED, ACTION_TYPE_MULTIACTION,
} = require('../src/actions');
const { TYPE_OBJECT, TYPE_ARRAY, TYPE_NUMBER, TYPE_STRING, TYPE_BOOLEAN } = require('../src/types');


const TARGET_ID = 'TARGET_ID';


describe('reducer receiving the SET action', () => {

  const reducer = createReducer(TYPE_NUMBER, 5)(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_SET,
        meta: {
          reduxId: TARGET_ID
        },
        payload: {
          value: 100,
        },
      });
    expect(newState).toBe(100);
  });

  it('does not react if reduxId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_SET,
        meta: {
          reduxId: 'some-other-id'
        },
        payload: {
          value: 100,
        },
      });
    expect(newState).toBe(oldState);
  });
});


describe('reducer receiving the ENTRY action', () => {

  const reducer = createReducer(TYPE_OBJECT, {})(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_ENTRY,
        meta: {
          reduxId: TARGET_ID
        },
        payload: {
          key: 'myKey',
          value: 100,
        },
      });
    expect(newState).toEqual({ myKey: 100 });
  });

  it('does not react if reduxId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_ENTRY,
        meta: {
          reduxId: 'some-other-id'
        },
        payload: {
          key: 'myKey',
          value: 100,
        },
      });
    expect(newState).toBe(oldState);
  });
});


describe('reducer receiving the REMOVE action', () => {

  const reducer = createReducer(TYPE_OBJECT, { someKey: 'someValue', removeMe: 100 })(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_REMOVE,
        meta: {
          reduxId: TARGET_ID
        },
        payload: {
          key: 'removeMe',
        },
      });
    expect(newState).toEqual({ someKey: 'someValue' });
  });

  it('does not react if reduxId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_REMOVE,
        meta: {
          reduxId: 'some-other-id'
        },
        payload: {
          key: 'removeMe',
        },
      });
    expect(newState).toBe(oldState);
  });
});


describe('reducer receiving the PUSH action', () => {

  const reducer = createReducer(TYPE_ARRAY, [11])(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_PUSH,
        meta: {
          reduxId: TARGET_ID
        },
        payload: {
          value: 22,
        },
      });
    expect(newState).toEqual([11, 22]);
  });

  it('does not react if reduxId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_PUSH,
        meta: {
          reduxId: 'some-other-id'
        },
        payload: {
          value: 22,
        },
      });
    expect(newState).toBe(oldState);
  });
});


describe('reducer receiving the UNSHIFT action', () => {

  const reducer = createReducer(TYPE_ARRAY, [11])(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_UNSHIFT,
        meta: {
          reduxId: TARGET_ID
        },
        payload: {
          value: 22,
        },
      });
    expect(newState).toEqual([22, 11]);
  });

  it('does not react if reduxId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_UNSHIFT,
        meta: {
          reduxId: 'some-other-id'
        },
        payload: {
          value: 22,
        },
      });
    expect(newState).toBe(oldState);
  });
});


describe('reducer receiving the POP action', () => {

  const reducer = createReducer(TYPE_ARRAY, [11, 22, 33])(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_POP,
        meta: {
          reduxId: TARGET_ID
        },
      });
    expect(newState).toEqual([11, 22]);
  });

  it('does not react if reduxId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_POP,
        meta: {
          reduxId: 'some-other-id'
        },
      });
    expect(newState).toBe(oldState);
  });
});


describe('reducer receiving the SHIFT action', () => {

  const reducer = createReducer(TYPE_ARRAY, [11, 22, 33])(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_SHIFT,
        meta: {
          reduxId: TARGET_ID
        },
      });
    expect(newState).toEqual([22, 33]);
  });

  it('does not react if reduxId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_SHIFT,
        meta: {
          reduxId: 'some-other-id'
        },
      });
    expect(newState).toBe(oldState);
  });
});


describe('reducer receiving a COMPOSE action', () => {

  const reducer = createReducer(TYPE_ARRAY, [11])(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_COMPOSED,
        payload: {
          actions: [
            { type: ACTION_TYPE_PUSH, payload: { value: 22 } },
            { type: ACTION_TYPE_PUSH, payload: { value: 33 } }
          ],
        },
        meta: {
          reduxId: TARGET_ID
        },
      });
    expect(newState).toEqual([11, 22, 33]);
  });

  it('does not react if reduxId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_COMPOSED,
        payload: {
          actions: [
            { type: ACTION_TYPE_PUSH, payload: { value: 22 } },
            { type: ACTION_TYPE_PUSH, payload: { value: 33 } }
          ],
        },
        meta: {
          reduxId: 'some-other-id'
        },
      });
    expect(newState).toBe(oldState);
  });
});


describe('reducer receiving a MULTIACTION action', () => {

  const reducer = createReducer(TYPE_ARRAY, [11])(TARGET_ID);
  const oldState = reducer();

  it('reacts if one of the actions reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_MULTIACTION,
        payload: {
          actionsMap: {
            [TARGET_ID]: [
              { type: ACTION_TYPE_PUSH, payload: { value: 22 } }
            ],
            'some-other-target': [
              { type: ACTION_TYPE_PUSH, payload: { value: 99 } }
            ],
          },
        },
      });
    expect(newState).toEqual([11, 22]);
  });

  it('does not react if reduxId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_MULTIACTION,
        payload: {
          actionsMap: {
            'some-other-target': [
              { type: ACTION_TYPE_PUSH, payload: { value: 22 } }
            ],
            'some-other-target-2': [
              { type: ACTION_TYPE_PUSH, payload: { value: 99 } }
            ],
          },
        },
      });
    expect(newState).toBe(oldState);
  });
});
