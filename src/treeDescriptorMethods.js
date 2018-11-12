

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


const getActionsTree = bindActionsFunc =>(descr, path = []) => {
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



module.exports = {
  getTreeReducer,
  getActionsTree,
};
