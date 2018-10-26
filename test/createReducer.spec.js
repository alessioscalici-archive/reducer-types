
const {
  createReducer,
  SET, ENTRY, REMOVE, PUSH, POP, SHIFT, UNSHIFT,
} = require('../src/redux-modules.js');


const TARGET_ID = 'TARGET_ID';


describe('reducer receiving the SET action', () => {

  const reducer = createReducer()(5)(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: SET,
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
        type: SET,
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

  const reducer = createReducer()({})(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: ENTRY,
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
        type: ENTRY,
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

  const reducer = createReducer()({ someKey: 'someValue', removeMe: 100 })(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: REMOVE,
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
        type: REMOVE,
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

  const reducer = createReducer()([11])(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: PUSH,
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
        type: PUSH,
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

  const reducer = createReducer()([11])(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: UNSHIFT,
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
        type: UNSHIFT,
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

  const reducer = createReducer()([11, 22, 33])(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: POP,
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
        type: POP,
        meta: {
          reduxId: 'some-other-id'
        },
      });
    expect(newState).toBe(oldState);
  });
});


describe('reducer receiving the SHIFT action', () => {

  const reducer = createReducer()([11, 22, 33])(TARGET_ID);
  const oldState = reducer();

  it('reacts if reduxId equals its target', () => {
    const newState = reducer(
      oldState,
      {
        type: SHIFT,
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
        type: SHIFT,
        meta: {
          reduxId: 'some-other-id'
        },
      });
    expect(newState).toBe(oldState);
  });
});
