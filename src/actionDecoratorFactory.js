/**
 *  actionDecoratorFactory:
 *  It returns a function which wraps a normal action creator into a new one,
 *  which adds the targetId to the action.
 *  @argument {string} targetId
 *  @return a function which takes an action creator as a parameter, and returns
 *    a new action creator which also adds the targetId to the action.
 */
const actionDecoratorFactory = targetId => actionCreator => (...args) => {
  const action = actionCreator(...args);
  if (!action) return action;
  if (!action.meta) action.meta = {};
  action.meta.targetId = targetId;
  return action;
};

module.exports = actionDecoratorFactory;
