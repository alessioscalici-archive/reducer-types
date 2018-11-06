
const { createCustomCreateReducer } = require('../src/redules');
const {
  ACTION_TYPE_SET, ACTION_TYPE_ENTRY, ACTION_TYPE_REMOVE, ACTION_TYPE_PUSH, ACTION_TYPE_POP, ACTION_TYPE_SHIFT, ACTION_TYPE_UNSHIFT, ACTION_TYPE_MULTIACTION,
} = require('../src/actions');
const { TYPE_OBJECT, TYPE_ARRAY, TYPE_NUMBER, TYPE_STRING, TYPE_BOOLEAN } = require('../src/types');


const TARGET_ID = 'TARGET_ID';

const createReducer = createCustomCreateReducer();

describe('reducer receiving the SET action', () => {

  const reducer = createReducer(TYPE_NUMBER, 5)(TARGET_ID);
  const oldState = reducer();

  it('reacts if targetId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_SET,
        meta: {
          targetId: TARGET_ID
        },
        payload: {
          value: 100,
        },
      });
    expect(newState).toBe(100);
  });

  it('does not react if targetId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_SET,
        meta: {
          targetId: 'some-other-id'
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

  it('reacts if targetId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_ENTRY,
        meta: {
          targetId: TARGET_ID
        },
        payload: {
          key: 'myKey',
          value: 100,
        },
      });
    expect(newState).toEqual({ myKey: 100 });
  });

  it('does not react if targetId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_ENTRY,
        meta: {
          targetId: 'some-other-id'
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

  it('reacts if targetId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_REMOVE,
        meta: {
          targetId: TARGET_ID
        },
        payload: {
          key: 'removeMe',
        },
      });
    expect(newState).toEqual({ someKey: 'someValue' });
  });

  it('does not react if targetId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_REMOVE,
        meta: {
          targetId: 'some-other-id'
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

  it('reacts if targetId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_PUSH,
        meta: {
          targetId: TARGET_ID
        },
        payload: {
          value: 22,
        },
      });
    expect(newState).toEqual([11, 22]);
  });

  it('does not react if targetId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_PUSH,
        meta: {
          targetId: 'some-other-id'
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

  it('reacts if targetId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_UNSHIFT,
        meta: {
          targetId: TARGET_ID
        },
        payload: {
          value: 22,
        },
      });
    expect(newState).toEqual([22, 11]);
  });

  it('does not react if targetId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_UNSHIFT,
        meta: {
          targetId: 'some-other-id'
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

  it('reacts if targetId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_POP,
        meta: {
          targetId: TARGET_ID
        },
      });
    expect(newState).toEqual([11, 22]);
  });

  it('does not react if targetId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_POP,
        meta: {
          targetId: 'some-other-id'
        },
      });
    expect(newState).toBe(oldState);
  });
});


describe('reducer receiving the SHIFT action', () => {

  const reducer = createReducer(TYPE_ARRAY, [11, 22, 33])(TARGET_ID);
  const oldState = reducer();

  it('reacts if targetId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_SHIFT,
        meta: {
          targetId: TARGET_ID
        },
      });
    expect(newState).toEqual([22, 33]);
  });

  it('does not react if targetId differs from its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ACTION_TYPE_SHIFT,
        meta: {
          targetId: 'some-other-id'
        },
      });
    expect(newState).toBe(oldState);
  });
});


describe('reducer receiving a MULTIACTION action', () => {

  const reducer = createReducer(TYPE_ARRAY, [11])(TARGET_ID);
  const oldState = reducer();

  it('reacts if one of the actions targetId equals its target', () => {
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

  it('does not react if targetId differs from its target', () => {
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
