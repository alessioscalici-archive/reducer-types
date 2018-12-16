
const { createStore, combineReducers } = require('redux');
const {
  type, buildModule,
} = require('../src/types');


const model1 = {
  articles: {
    byId: type.object({}),
    ids: type.array([]),
    selectedId: type.string(null),
  },
};

const usersModel = {
  users: {
    byId: type.object({}),
    ids: type.array([]),
    selectedId: type.string(null),
  },
};

const model2 = {
  ...model1,
  ...usersModel,
};


const mod1 = buildModule(model1)();
const { actions } = mod1;
const { reducer } = mod1;

const mod2 = buildModule(model2)();
const actions2 = mod2.actions;
const reducer2 = mod2.reducer;


describe('must create a store', () => {
  let reduxStore;

  beforeEach(() => {
    reduxStore = createStore(reducer);
  });

  it('with the correct structure and initial state', () => {
    const state = reduxStore.getState();

    expect(typeof state.articles).toBe('object');
    expect(state.articles.byId).toEqual({});
    expect(state.articles.ids).toEqual([]);
    expect(state.articles.selectedId).toEqual(null);
  });

  it('that reacts to the actions', () => {
    reduxStore.dispatch(actions.articles.byId.entry('myKey', 123));
    const state = reduxStore.getState();
    expect(state.articles.byId).toEqual({ myKey: 123 });
  });
});

describe('must retain state on replaceReducer', () => {
  let reduxStore;

  beforeEach(() => {
    reduxStore = createStore(reducer);
  });

  it('after dispatching actions', () => {
    reduxStore.dispatch(actions.articles.byId.entry('myKey', 123));
    expect(reduxStore.getState().articles.byId).toEqual({ myKey: 123 });

    reduxStore.replaceReducer(reducer2);
    reduxStore.dispatch(actions2.users.selectedId.set('myUserId'));

    expect(reduxStore.getState().articles.byId).toEqual({ myKey: 123 });
    expect(reduxStore.getState().users.selectedId).toEqual('myUserId');
  });
});


describe('must work with mountpoints', () => {
  const MOUNT_POINT = 'myPlugin';
  const m1 = buildModule(model1)([MOUNT_POINT]);

  let reduxStore;

  beforeEach(() => {
    reduxStore = createStore(combineReducers({
      [MOUNT_POINT]: m1.reducer,
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
    reduxStore.dispatch(m1.actions.articles.byId.entry('myKey', 123));
    const rootState = reduxStore.getState();
    const state = rootState[MOUNT_POINT];
    expect(state.articles.byId).toEqual({ myKey: 123 });
  });

  it('that works with selectors', () => {
    const rootState = reduxStore.getState();
    expect(m1.selectors.articles.byId(rootState))
      .toEqual(rootState[MOUNT_POINT].articles.byId);
  });
});
