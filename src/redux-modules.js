const PREFIX = 'rm:';


// ============ ACTIONS ============ //

// Generic
const RM_SET = `${PREFIX}set`;

// Object
const RM_ENTRY = `${PREFIX}entry`;
const RM_REMOVE = `${PREFIX}remove`;

// Array
const RM_PUSH = `${PREFIX}push`;
const RM_POP = `${PREFIX}pop`;
const RM_UNSHIFT = `${PREFIX}unshift`;
const RM_SHIFT = `${PREFIX}shift`;

// Compose
const RM_COMPOSED = `${PREFIX}composed`;

// Multiaction
const RM_MULTIACTION = `${PREFIX}multiaction`;


const set = value => ({ type: RM_SET, payload: { value } });

const entry = (key, value) => ({ type: RM_ENTRY, payload: { key, value } });
const remove = key => ({ type: RM_REMOVE, payload: { key } });

const push = value => ({ type: RM_PUSH, payload: { value } });
const unshift = value => ({ type: RM_UNSHIFT, payload: { value } });
const pop = () => ({ type: RM_POP });
const shift = () => ({ type: RM_SHIFT });

const compose = (...actions) => ({ type: RM_COMPOSED, payload: { actions } });

const multiAction = (...actions) => {
    const actionsMap = actions.reduce((acc, act) => {
        if (act && act.meta && act.meta.reduxId) {
            if(!acc[act.meta.reduxId]) {
                acc[act.meta.reduxId] = [];
            }
            acc[act.meta.reduxId].push(act);
        }
        return acc;
    }, {});
    return { type: RM_MULTIACTION, payload: { actionsMap } };
};


const DEFAULT_ACTION_MAP = {
    [RM_SET]: (state, action) => action.payload.value,
    [RM_ENTRY]: (state, action) => {
      const { key, value } = action.payload;
      return (!state || state[key] === value) ? state : { ...state, [key]: value };
    },
    [RM_REMOVE]: (state, action) => {
      if (!state || !state.hasOwnProperty(action.payload.key)) {
        return state;
      }
      const { [action.payload.key]: val, ...res } = state;
      return res;
    },

    [RM_PUSH]: (state, action) => (state && Array.isArray(state) ? [ ...state, action.payload.value ] : state),
    [RM_UNSHIFT]: (state, action) => (state && Array.isArray(state) ? [ action.payload.value, ...state ] : state),
    [RM_POP]: state => state && Array.isArray(state) ? state.slice(0, state.length-1) : state,
    [RM_SHIFT]: state => state && Array.isArray(state) ? state.slice(1) : state,
};



// ============ BINDING ============ //


const bindActionCreator = (reduxId) => (actionCreator) => (...args) => {
    const action = actionCreator(...args);
    if (!action) return action;
    if (!action.meta) action.meta = {};
    action.meta.reduxId = reduxId;
    return action;
};





// createReducer : ActionMap -> _ -> string -> ((State, Action) -> State)
const createReducer = (customActionMap = null) => {

    const actionMap = typeof customActionMap === 'object' ?
        { ...DEFAULT_ACTION_MAP, ...customActionMap } :
        DEFAULT_ACTION_MAP;

    const defaultReducer = (state, action) => {

        if (action.type === RM_COMPOSED) {
            return action.payload.actions.reduce((acc, act) => {
                if (actionMap[act.type]) {
                    return actionMap[act.type](acc, act);
                }
                return acc;
            }, state);
        }


        if (actionMap[action.type]) {
            return actionMap[action.type](state, action);
        }
        return state;
    };

    return (initialValue = null) => (reduxId) => (state = initialValue, action) => {

        if (!action) return state;

        if (action.type === RM_MULTIACTION) {
            if (action.payload.actionsMap[reduxId]) {
                return action.payload.actionsMap[reduxId].reduce(defaultReducer, state);
            }
        }

        if (!action.meta || action.meta.reduxId !== reduxId) {
            return state;
        }


        return defaultReducer(state, action);
    };

}



// ============ UTILS ============ //

// Factory
class ReduxType {
    constructor(initialValue = null, actionMap = null) {
        this.initialValue = initialValue;
        this.actionMap = actionMap;
    }

    get reducerFactory () {
        return createReducer(this.actionMap)(this.initialValue);
    }


    create(reduxId) {
        const wrap = bindActionCreator(reduxId);
        const includedActions = { set, entry, remove, push, unshift, pop, shift, compose };
        const actionCreators = Object.keys(includedActions).reduce((acc, key) => {
            acc[key] = wrap(includedActions[key]);
            return acc;
        }, {});

        return {
            ...actionCreators,
            reducer: this.reducerFactory(reduxId),
        }
    }
}

module.exports = {
    ReduxType,

    SET: RM_SET,
    ENTRY: RM_ENTRY,
    REMOVE: RM_REMOVE,
    PUSH: RM_PUSH,
    POP: RM_POP,
    UNSHIFT: RM_UNSHIFT,
    SHIFT: RM_SHIFT,
    COMPOSE: RM_COMPOSED,
    MULTIACTION: RM_MULTIACTION,

    set,
    entry,
    remove,
    push,
    pop,
    shift,
    unshift,

    compose,
    multiAction,

    bindActionCreator, // TODO: rename
    DEFAULT_ACTION_MAP,
    createReducer,
};
module.exports.default = module.exports;
