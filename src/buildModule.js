const initActionDecoratorFactory = require('./initActionDecoratorFactory');
const initReducerFactory = require('./initReducerFactory');

const getTreeReducer = createReducerFunc => descr => (path = []) => {
  if (descr.isLeaf) {
    const id = path.join('.');
    return createReducerFunc(descr.type, descr.initialValue)(id);
  }
  const getReducerRec = getTreeReducer(createReducerFunc);
  return (state, action) => Object.keys(descr).reduce((acc, key) => {
    acc[key] = getReducerRec(descr[key])([...path, key])(state && state[key], action);
    return acc;
  }, {});
};


const getActionsTree = bindActionsFunc => descr => (path = []) => {
  if (descr.isLeaf) {
    const id = path.join('.');
    return bindActionsFunc(descr.type)(id);
  }
  const getActions = getActionsTree(bindActionsFunc);
  return Object.keys(descr).reduce((acc, key) => {
    acc[key] = getActions(descr[key])([...path, key]);
    return acc;
  }, {});
};


const createSelectorFromPath = (path = []) => (obj) => {
  let ref = obj;
  for (let i = 0; i < path.length; i += 1) {
    if (!ref) return ref;
    ref = ref[path[i]];
  }
  return ref;
};

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
const sanitize = str => str.replace(/[^a-zA-Z0-9]/g, '');

const transformKey = str => capitalize(sanitize(str));

const createSelectorNameFromPath = (path = []) => {
  let res = 'get';
  for (let i = 0; i < path.length; i += 1) {
    res += transformKey(path[i]);
  }
  return res;
};

const getSelectorsTree = descr => (mountpoint = [], path = []) => {
  if (descr.isLeaf) {
    return {
      selector: createSelectorFromPath([...mountpoint, ...path]),
      name: createSelectorNameFromPath(path),
    };
  }
  return Object.keys(descr).reduce((acc, key) => {
    acc[key] = getSelectorsTree(descr[key])(mountpoint, [...path, key]);
    return acc;
  }, {});
};

const getSelectorsArray = (obj) => {
  if (obj.selector && obj.name) {
    return { [obj.name]: obj.selector };
  }
  return Object.keys(obj).reduce((acc, key) => {
    // eslint-disable-next-line no-param-reassign
    acc = {
      ...acc,
      ...getSelectorsArray(obj[key]),
    };
    return acc;
  }, {});
};

const getSelectors = descr => (path = []) => {
  const selectorsTree = getSelectorsTree(descr)(path);
  return getSelectorsArray(selectorsTree);
};


const buildModule = config => model => (path = []) => ({
  selectors: getSelectors(model)(path),
  reducer: getTreeReducer(initReducerFactory(config))(model)(path),
  actions: getActionsTree(initActionDecoratorFactory(config))(model)(path),
});


module.exports = buildModule;
