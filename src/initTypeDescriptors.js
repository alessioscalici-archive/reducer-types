
const mergeConfigs = require('./mergeConfigs');

const initTypeDescriptors = (...typeConfigs) => {
  const typeConfig = mergeConfigs(...typeConfigs);
  return Object.keys(typeConfig).reduce((acc, type) => {
    acc[type] = (initialValue, typeParams) => ({
      type, initialValue, typeParams, isLeaf: true,
    });
    return acc;
  }, {});
};


module.exports = initTypeDescriptors;
