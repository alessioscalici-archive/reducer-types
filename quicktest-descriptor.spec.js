const {
  createCustomCreateReducer,
  generateBindActions,
} = require('./src/redules');

const {
  getTreeReducer,
  getActionsTree,
  getSelectors,
} = require('./src/treeDescriptorMethods');

const generateTypeDescriptors = require('./src/generateTypeDescriptors');

const {
  TYPE_STRING,
} = require('./src/types/const');


// Generate actions tree

const TEST_CUSTOM_CONFIG = {
  [TYPE_STRING]: {
    actionHandlers: {
      CAPITALIZE: state => (state ? (state.charAt(0).toUpperCase() + state.slice(1)) : state),
    },
    actionCreators: {
      capitalize: () => ({ type: 'CAPITALIZE' }),
    },
  },
  user: {
    actionHandlers: {
      CHANGE_PASSWORD: (state, action) => ({ ...state, password: action.payload.newPassword }),
    },
    actionCreators: {
      changePassword: newPassword => ({ type: 'CHANGE_PASSWORD', payload: { newPassword } }),
    },
  },
};


const { CONFIG } = require('./src/types');

const createReducer = createCustomCreateReducer(CONFIG, TEST_CUSTOM_CONFIG);
const bindActions = generateBindActions(CONFIG, TEST_CUSTOM_CONFIG);
const type = generateTypeDescriptors(CONFIG, TEST_CUSTOM_CONFIG);


const { compose } = require('./src/actions');
// import also type


// splitting descriptors
const usersDescriptor = {
  loading: type.boolean(true),
  curId: type.string(null),
  ids: type.array([]),
  byId: type.object({}),
};


const descriptor = {
  loading: type.boolean(true),
  articles: {
    curId: type.string(null),
    ids: type.array([]),
    byId: type.object({}),
  },
  users: usersDescriptor,

  customUser: type.user({ username: 'valid', password: 'is secret!' }),
};


const actions = getActionsTree(bindActions)(descriptor);
const reducer = getTreeReducer(createReducer)(descriptor);

const selectors = getSelectors(id => id)(descriptor);
const usersSelectors = getSelectors(state => state.users)(usersDescriptor);


const setLoading = actions.loading.set;
const addArticle = article => compose(
  actions.articles.ids.push(article.id),
  actions.articles.byId.entry(article.id, article),
  setLoading(false),
);

const addUserIds = () => compose(
  actions.users.ids.push(1),
  actions.users.ids.push(2),
  actions.users.ids.push(3),
);

// nesting composes
const doALotOfStuff = article => compose(
  addArticle(article), // composing another compose
  actions.articles.curId.set(article.id),
  addUserIds(), // composing another compose
  actions.articles.curId.capitalize(), // custom action on existing type (string)
  actions.customUser.changePassword('new password!'), // custom type action
);


let state;

// eslint-disable-next-line prefer-const
state = reducer(state, doALotOfStuff({ id: 'pippo', text: 'hello!' }));

describe('produces the correct state', () => {
  it('produces the correct state', () => {
    expect(state.users.ids).toEqual([1, 2, 3]);
    expect(state.articles.ids).toEqual(['pippo']);
    expect(state.articles.byId.pippo).toEqual({ id: 'pippo', text: 'hello!' });
    expect(state.articles.curId).toEqual('Pippo');
    expect(state.customUser).toEqual({ username: 'valid', password: 'new password!' });
  });
});

it('selectors', () => {
  expect(selectors.getUsersIds(state)).toEqual([1, 2, 3]);
  expect(usersSelectors.getIds(state)).toEqual([1, 2, 3]);
});
