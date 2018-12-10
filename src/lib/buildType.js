
module.exports = (...actions) => actions.reduce((acc, action) => {
  acc.actionTypes[action.id] = action.type;
  acc.actionCreators[action.id] = action.creator;
  acc.actionHandlers[action.type] = action.handler;
  acc.actionIds.push(action.id);
  return acc;
}, {
  actionHandlers: {},
  actionCreators: {},
  actionTypes: {},
  actionIds: [],
});
