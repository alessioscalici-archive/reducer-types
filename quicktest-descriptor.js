const {
  bindGenericActions,
  bindArrayActions,
  bindObjectActions,
  bindNumberActions,
  bindBooleanActions,
  bindStringActions,

  createReducer,
} = require('./src/redules');



const TYPE_STRING = 'string';
const TYPE_NUMBER = 'number';
const TYPE_BOOLEAN = 'boolean';
const TYPE_OBJECT = 'object';
const TYPE_ARRAY = 'array';



const descr = (type, initialValue) => ({ type, initialValue, isLeaf: true });



// Generate ids tree (exercise)

const getIds = (descr, path = []) => {
  if (descr.isLeaf) {
    return path.join('.');
  }
  return Object.keys(descr).reduce((acc, key) => {
    acc[key] = getIds(descr[key], [...path, key]);
    return acc;
  }, {});
};



// Generate actions tree

const TYPE_ACTION_MAP = {
  [TYPE_STRING]: bindStringActions,
  [TYPE_NUMBER]: bindNumberActions,
  [TYPE_BOOLEAN]: bindBooleanActions,
  [TYPE_OBJECT]: bindObjectActions,
  [TYPE_ARRAY]: bindArrayActions,

};

const getActions = (descr, path = []) => {
  if (descr.isLeaf) {
    if (TYPE_ACTION_MAP[descr.type]) {
      const id = path.join('.');
      return {
        ...TYPE_ACTION_MAP[descr.type](id),
        ...bindGenericActions(id),
      };
    }
  }
  return Object.keys(descr).reduce((acc, key) => {
    acc[key] = getActions(descr[key], [...path, key]);
    return acc;
  }, {});
};



// Generate reducers tree

const customCreateReducer = createReducer( /* no custom action map */ ); // TODO: CUSTOM MAP!!

const getReducer = (descr, path = []) => {
  if (descr.isLeaf) {
    const id = path.join('.');
    return customCreateReducer(descr.initialValue)(id);
  }
  return (state, action) => Object.keys(descr).reduce((acc, key) => {
    acc[key] = getReducer(descr[key], [...path, key])(state && state[key], action);
    return acc;
  }, {});
};



// Generate selectors tree

const get = (obj, path = []) => path.reduce((acc, key) => acc && acc[key], obj);
const getSelectors = (descr, path = []) => {
  if (descr.isLeaf) {
    return state => get(state, path);
  }
  return Object.keys(descr).reduce((acc, key) => {
    acc[key] = getSelectors(descr[key], [...path, key]);
    return acc;
  }, {});
};

// Generate selectors NAMES tree

const getSelectorNames = (descr, path = []) => {
  if (descr.isLeaf) {
    return 'get' + path.map(key => key.charAt(0).toUpperCase() + key.slice(1)).join('');
  }
  return Object.keys(descr).reduce((acc, key) => {
    acc[key] = getSelectorNames(descr[key], [...path, key]);
    return acc;
  }, {});
};




const { push, unshift, shift, entry, multiAction } = require('./src/redules');
// import also types: TYPE_BOOLEAN, TYPE_STRING, TYPE_ARRAY, TYPE_OBJECT


const descriptor = {
  loading: descr(TYPE_BOOLEAN, true),
  articles: {
    curId: descr(TYPE_STRING, null),
    ids: descr(TYPE_ARRAY, []),
    byId: descr(TYPE_OBJECT, {}),
  }
};



const ids = getIds(descriptor);
const actions = getActions(descriptor);
const reducer = getReducer(descriptor);
const selectors = getSelectors(descriptor);
const selectorNames = getSelectorNames(descriptor);


const setLoading = actions.loading.set;
const addArticle = article => multiAction(
  actions.articles.ids.push(article.id),
  actions.articles.byId.entry(article.id, article),
  setLoading(false),
);

// nesting multiActions
const addArticleAndSelectIt = article => multiAction(
  addArticle(article),
  actions.articles.curId.set(article.id),
);


let state;

state = reducer(state, addArticleAndSelectIt({ id: 'pippo', text: 'hello!' }));



console.log(state);