
const { createStore, combineReducers } = require('redux');
const {
  type, buildModule,
} = require('../src/types');


const model = {
  articles: {
    byId: type.object({}),
    ids: type.array([]),
    selectedId: type.string(null),
  },
};


describe('must work with multiple mountpoints', () => {
  const MOUNT_POINT_1 = 'myPlugin';
  const MOUNT_POINT_2 = 'myAddOn';
  const m1 = buildModule(model)([MOUNT_POINT_1]);
  const m2 = buildModule(model)([MOUNT_POINT_2]);
  let reduxStore;

  beforeEach(() => {
    reduxStore = createStore(combineReducers({
      [MOUNT_POINT_1]: m1.reducer,
      [MOUNT_POINT_2]: m2.reducer,
    }));
  });

  it('with the correct structure and initial state', () => {
    const rootState = reduxStore.getState();
    const state = rootState[MOUNT_POINT_1];

    expect(typeof state.articles).toBe('object');
    expect(state.articles.byId).toEqual({});
    expect(state.articles.ids).toEqual([]);
    expect(state.articles.selectedId).toEqual(null);
  });

  it('that reacts to the actions', () => {
    debugger;
    reduxStore.dispatch(m1.actions.articles.byId.entry('myKey', 123));
    reduxStore.dispatch(m2.actions.articles.byId.entry('myKey', 456));
    const rootState = reduxStore.getState();
    expect(rootState[MOUNT_POINT_1].articles.byId).toEqual({ myKey: 123 });
    expect(rootState[MOUNT_POINT_2].articles.byId).toEqual({ myKey: 456 });
  });

  it('that works with selectors', () => {
    const rootState = reduxStore.getState();
    expect(m1.selectors.getArticlesById(rootState))
      .toEqual(rootState[MOUNT_POINT_1].articles.byId);
  });
});


describe('must work with a single type', () => {
  const MOUNT_POINT_1 = 'myNumber';
  const m1 = buildModule(type.number(3))([MOUNT_POINT_1]);
  let reduxStore;

  beforeEach(() => {
    reduxStore = createStore(combineReducers({
      [MOUNT_POINT_1]: m1.reducer,
    }));
  });

  it('with the correct initial state', () => {
    const rootState = reduxStore.getState();
    const state = rootState[MOUNT_POINT_1];
    expect(state).toBe(3);
  });

  it('that reacts to the actions', () => {
    reduxStore.dispatch(m1.actions.add(123));
    const rootState = reduxStore.getState();
    expect(rootState[MOUNT_POINT_1]).toBe(126);
  });

  it('creates the selector', () => {
    const rootState = reduxStore.getState();
    expect(m1.selectors.get(rootState)).toBe(3);
  });
});
