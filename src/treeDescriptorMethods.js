
const mergeConfigs = require('./mergeConfigs');

const generateTypeDescriptors = (...typeConfigs) => {
  const typeConfig = mergeConfigs(...typeConfigs);
  return Object.keys(typeConfig).reduce((acc, type) => {
    acc[type] = initialValue => {
      return { type, initialValue, isLeaf: true };
    };
    return acc;
  }, {});
};


const getTreeReducer = createReducerFunc => (descr, path = []) => {
  if (descr.isLeaf) {
    const id = path.join('.');
    return createReducerFunc(descr.type, descr.initialValue)(id);
  }
  const getReducerRec = getTreeReducer(createReducerFunc);
  return (state, action) => Object.keys(descr).reduce((acc, key) => {
    acc[key] = getReducerRec(descr[key], [...path, key])(state && state[key], action);
    return acc;
  }, {});
};


const getActionsTree = bindActionsFunc => (descr, path = []) => {
  if (descr.isLeaf) {
    const id = path.join('.');
    return bindActionsFunc(descr.type)(id);
  }
  const getActions = getActionsTree(bindActionsFunc);
  return Object.keys(descr).reduce((acc, key) => {
    acc[key] = getActions(descr[key], [...path, key]);
    return acc;
  }, {});
};


const createSelectorFromPath = (path = []) => obj => {
  let ref = obj;
  for (let key of path) {
    if (!ref) return ref;
    ref = ref[key];
  }
  return ref;
};

const composeSelectors = (...selectors) => obj => selectors.reduce((acc, sel) => sel(acc), obj);


const getSelectorIdFromPath = (path = []) => path.reduce((acc, it) => {   return acc + it.charAt(0).toUpperCase() + it.slice(1); }, 'get');

const getSelectors = (baseSelector = (a => a)) => (descr, path = []) => {
  if (descr.isLeaf) {
    return baseSelector ? composeSelectors(baseSelector, createSelectorFromPath(path)) : createSelectorFromPath(path);
  }
  return Object.keys(descr).reduce((acc, key) => {

    const res = getSelectors(baseSelector)(descr[key], [...path, key]);
    if (typeof res === 'function') {
      const id = getSelectorIdFromPath([...path, key]);
      acc[id] = res;
    } else {
      acc = { ...acc, ...res };
    }
    return acc;
  }, {});
};

module.exports = {
  generateTypeDescriptors,
  getTreeReducer,
  getActionsTree,
  getSelectors,
};
