
const mergeConfigs = require('./mergeConfigs');

const generateTypeDescriptors = (...typeConfigs) => {
  const typeConfig = mergeConfigs(...typeConfigs);
  return Object.keys(typeConfig).reduce((acc, type) => {
    acc[type] = initialValue => ({ type, initialValue, isLeaf: true });
    return acc;
  }, {});
};


module.exports = generateTypeDescriptors;
