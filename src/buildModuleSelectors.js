
const createSelectorFromPath = (path = []) => (obj) => {
  let ref = obj;
  for (let i = 0; i < path.length; i += 1) {
    if (!ref) return ref;
    ref = ref[path[i]];
  }
  return ref;
};

const buildModuleSelectors = descr => (mountpoint = [], path = []) => {
  if (descr.isLeaf) {
    return createSelectorFromPath([...mountpoint, ...path]);
  }
  return Object.keys(descr).reduce((acc, key) => {
    acc[key] = buildModuleSelectors(descr[key])(mountpoint, [...path, key]);
    return acc;
  }, {});
};

// TODO: use this in the static code generator

// const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
// const sanitize = str => str.replace(/[^a-zA-Z0-9]/g, '');
//
// const transformKey = str => capitalize(sanitize(str));
//
// const createSelectorNameFromPath = (path = []) => {
//   let res = 'get';
//   for (let i = 0; i < path.length; i += 1) {
//     res += transformKey(path[i]);
//   }
//   return res;
// };

// const buildNamedModuleSelectorsTree = descr => (mountpoint = [], path = []) => {
//   if (descr.isLeaf) {
//     return {
//       selector: createSelectorFromPath([...mountpoint, ...path]),
//       name: createSelectorNameFromPath(path),
//     };
//   }
//   return Object.keys(descr).reduce((acc, key) => {
//     acc[key] = buildNamedModuleSelectorsTree(descr[key])(mountpoint, [...path, key]);
//     return acc;
//   }, {});
// };
//
// const getSelectorsArray = (obj) => {
//   if (obj.selector && obj.name) {
//     return { [obj.name]: obj.selector };
//   }
//   return Object.keys(obj).reduce((acc, key) => {
//     // eslint-disable-next-line no-param-reassign
//     acc = {
//       ...acc,
//       ...getSelectorsArray(obj[key]),
//     };
//     return acc;
//   }, {});
// };
//
// const buildNamedModuleSelectors = descr => (path = []) => {
//   const selectorsTree = buildNamedModuleSelectorsTree(descr)(path);
//   return getSelectorsArray(selectorsTree);
// };


module.exports = buildModuleSelectors;
