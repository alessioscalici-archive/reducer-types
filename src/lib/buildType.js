
module.exports = actions => Object.keys(actions).reduce((acc, actionId) => {
  const action = actions[actionId];
  acc.actionTypes[actionId] = action.type;
  acc.actionCreators[actionId] = action.creator;
  acc.actionHandlers[action.type] = action.handler;
  acc.actionIds.push(actionId);
  return acc;
}, {
  actionHandlers: {},
  actionCreators: {},
  actionTypes: {},
  actionIds: [],
});
