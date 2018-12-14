

const initTypeDescriptors = typeConfig => (
  Object.keys(typeConfig).reduce((acc, type) => {
    acc[type] = initialValue => ({ type, initialValue, isLeaf: true });
    return acc;
  }, {})
);


module.exports = initTypeDescriptors;
