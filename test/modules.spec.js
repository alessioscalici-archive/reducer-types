
const { createStore, combineReducers } = require('redux');
const {
  type, buildModule,
} = require('../src/basic-types');


const model = {
  articles: {
    byId: type.object({}),
    ids: type.array([]),
    selectedId: type.string(null),
  },
};


describe('must work with mountpoints', () => {
  const MOUNT_POINT = 'myPlugin';
  const { selectors, actions, reducer } = buildModule(model)([MOUNT_POINT]);
  const { getArticlesById } = selectors;
  let reduxStore;

  beforeEach(() => {
    reduxStore = createStore(combineReducers({
      [MOUNT_POINT]: reducer,
    }));
  });

  it('with the correct structure and initial state', () => {
    const rootState = reduxStore.getState();
    const state = rootState[MOUNT_POINT];

    expect(typeof state.articles).toBe('object');
    expect(state.articles.byId).toEqual({});
    expect(state.articles.ids).toEqual([]);
    expect(state.articles.selectedId).toEqual(null);
  });

  it('that reacts to the actions', () => {
    reduxStore.dispatch(actions.articles.byId.entry('myKey', 123));
    const rootState = reduxStore.getState();
    const state = rootState[MOUNT_POINT];
    expect(state.articles.byId).toEqual({ myKey: 123 });
  });

  it('that works with selectors', () => {
    const rootState = reduxStore.getState();
    expect(getArticlesById(rootState))
      .toEqual(rootState[MOUNT_POINT].articles.byId);
  });
});
