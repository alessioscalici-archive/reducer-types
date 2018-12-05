const initReducerFactory = require('./initReducerFactory');

const buildReducer = createReducerFunc => descr => (path = []) => {
  if (descr.isLeaf) {
    const id = path.join('.');
    return createReducerFunc(descr.type, descr.initialValue, descr.typeParams)(id);
  }
  const getReducerRec = buildReducer(createReducerFunc);
  return (state, action) => Object.keys(descr).reduce((acc, key) => {
    acc[key] = getReducerRec(descr[key])([...path, key])(state && state[key], action);
    return acc;
  }, {});
};


const buildModuleReducer = config => model => (path = []) => (
  buildReducer(initReducerFactory(config))(model)(path)
);

module.exports = buildModuleReducer;
