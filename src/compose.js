
const { ACTION_TYPE_COMPOSE } = require('./lib/actions');


const compose = (...actions) => {
  const actionsMap = actions.reduce((acc, act) => {
    if (!act) {
      return acc;
    }
    if (act && act.meta && act.meta.targetId) {
      if (!acc[act.meta.targetId]) {
        acc[act.meta.targetId] = [];
      }
      acc[act.meta.targetId].push(act);
    } else if (act && act.type === ACTION_TYPE_COMPOSE) {
      Object.keys(act.payload.actionsMap).forEach((targetId) => {
        if (!acc[targetId]) {
          acc[targetId] = [];
        }
        acc[targetId] = acc[targetId].concat(act.payload.actionsMap[targetId]);
      });
    }
    return acc;
  }, {});
  return { type: ACTION_TYPE_COMPOSE, payload: { actionsMap } };
};


module.exports = compose;
