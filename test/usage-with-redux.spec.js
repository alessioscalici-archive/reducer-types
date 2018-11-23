
const { createStore, combineReducers } = require('redux');
const {
  type, getTreeReducer, getActionsTree,
} = require('../src/basic-types');


const model = {
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
  ...model,
  ...usersModel,
};


const reducer = getTreeReducer(model)();
const actions = getActionsTree(model)();


const reducer2 = getTreeReducer(model2)();
const actions2 = getActionsTree(model2)();


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
  const mountedReducer = getTreeReducer(model)([MOUNT_POINT]);
  const mountedActions = getActionsTree(model)([MOUNT_POINT]);

  let reduxStore;

  beforeEach(() => {
    reduxStore = createStore(combineReducers({
      [MOUNT_POINT]: mountedReducer,
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
    reduxStore.dispatch(mountedActions.articles.byId.entry('myKey', 123));
    const rootState = reduxStore.getState();
    const state = rootState[MOUNT_POINT];
    expect(state.articles.byId).toEqual({ myKey: 123 });
  });
});
