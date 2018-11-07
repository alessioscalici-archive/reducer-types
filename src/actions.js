
const { PREFIX } = require('./types/const');


// ============ ACTIONS ============ //

// Generic
const ACTION_TYPE_SET = `${PREFIX}set`;


// compose
const ACTION_TYPE_COMPOSE = `${PREFIX}compose`;


const set = value => ({ type: ACTION_TYPE_SET, payload: { value } });

const compose = (...actions) => {
    const actionsMap = actions.reduce((acc, act) => {
        if (!act) {
          return acc;
        }
        if (act && act.meta && act.meta.targetId) {
            if(!acc[act.meta.targetId]) {
                acc[act.meta.targetId] = [];
            }
            acc[act.meta.targetId].push(act);
        } else if (act && act.type === ACTION_TYPE_COMPOSE) {
            Object.keys(act.payload.actionsMap).forEach((targetId) => {
                if(!acc[targetId]) {
                    acc[targetId] = [];
                }
                acc[targetId] = acc[targetId].concat(act.payload.actionsMap[targetId]);
            });
        }
        return acc;
    }, {});
    return { type: ACTION_TYPE_COMPOSE, payload: { actionsMap } };
};


module.exports = {
    ACTION_TYPE_SET, ACTION_TYPE_COMPOSE,
    set, compose,
};
