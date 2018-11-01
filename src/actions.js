
const PREFIX = 'rd:';


// ============ ACTIONS ============ //

// Generic
const ACTION_TYPE_SET = `${PREFIX}set`;

// Object
const ACTION_TYPE_ENTRY = `${PREFIX}entry`;
const ACTION_TYPE_REMOVE = `${PREFIX}remove`;

// Array
const ACTION_TYPE_PUSH = `${PREFIX}push`;
const ACTION_TYPE_POP = `${PREFIX}pop`;
const ACTION_TYPE_UNSHIFT = `${PREFIX}unshift`;
const ACTION_TYPE_SHIFT = `${PREFIX}shift`;

// Number
const ACTION_TYPE_ADD = `${PREFIX}add`;
const ACTION_TYPE_SUBTRACT = `${PREFIX}subtract`;
const ACTION_TYPE_MULTIPLY = `${PREFIX}multiply`;
const ACTION_TYPE_DIVIDE = `${PREFIX}divide`;
const ACTION_TYPE_MOD = `${PREFIX}mod`;
const ACTION_TYPE_NEGATE = `${PREFIX}negate`;
const ACTION_TYPE_BW_AND = `${PREFIX}bw_and`;
const ACTION_TYPE_BW_OR = `${PREFIX}bw_or`;
const ACTION_TYPE_BW_XOR = `${PREFIX}bw_xor`;

// Boolean
const ACTION_TYPE_AND = `${PREFIX}and`;
const ACTION_TYPE_OR = `${PREFIX}or`;
const ACTION_TYPE_XOR = `${PREFIX}xor`;
const ACTION_TYPE_NOT = `${PREFIX}not`;

// String
const ACTION_TYPE_UPPERCASE = `${PREFIX}uppercase`;
const ACTION_TYPE_LOWERCASE = `${PREFIX}lowercase`;



// Compose
const ACTION_TYPE_COMPOSED = `${PREFIX}composed`;

// Multiaction
const ACTION_TYPE_MULTIACTION = `${PREFIX}multiaction`;


const set = value => ({ type: ACTION_TYPE_SET, payload: { value } });

const entry = (key, value) => ({ type: ACTION_TYPE_ENTRY, payload: { key, value } });
const remove = key => ({ type: ACTION_TYPE_REMOVE, payload: { key } });

const push = value => ({ type: ACTION_TYPE_PUSH, payload: { value } });
const unshift = value => ({ type: ACTION_TYPE_UNSHIFT, payload: { value } });
const pop = () => ({ type: ACTION_TYPE_POP });
const shift = () => ({ type: ACTION_TYPE_SHIFT });


const add = value => ({ type: ACTION_TYPE_ADD, payload: { value } });
const subtract = value => ({ type: ACTION_TYPE_SUBTRACT, payload: { value } });
const multiply = value => ({ type: ACTION_TYPE_MULTIPLY, payload: { value } });
const divide = value => ({ type: ACTION_TYPE_DIVIDE, payload: { value } });
const mod = value => ({ type: ACTION_TYPE_MOD, payload: { value } });
const negate = value => ({ type: ACTION_TYPE_NEGATE, payload: { value } });
const bitwiseAnd = value => ({ type: ACTION_TYPE_BW_AND, payload: { value } });
const bitwiseOr = value => ({ type: ACTION_TYPE_BW_OR, payload: { value } });
const bitwiseXor = value => ({ type: ACTION_TYPE_BW_XOR, payload: { value } });

const and = value => ({ type: ACTION_TYPE_AND, payload: { value } });
const or = value => ({ type: ACTION_TYPE_OR, payload: { value } });
const xor = value => ({ type: ACTION_TYPE_XOR, payload: { value } });
const not = value => ({ type: ACTION_TYPE_NOT });

const uppercase = value => ({ type: ACTION_TYPE_UPPERCASE });
const lowercase = value => ({ type: ACTION_TYPE_LOWERCASE });


const compose = (...actions) => ({ type: ACTION_TYPE_COMPOSED, payload: { actions } });

const multiAction = (...actions) => {
    const actionsMap = actions.reduce((acc, act) => {
        if (!act) {
          return acc;
        }
        if (act && act.meta && act.meta.reduxId) {
            if(!acc[act.meta.reduxId]) {
                acc[act.meta.reduxId] = [];
            }
            acc[act.meta.reduxId].push(act);
        } else if (act && act.type === ACTION_TYPE_MULTIACTION) {
            Object.keys(act.payload.actionsMap).forEach((reduxId) => {
                if(!acc[reduxId]) {
                    acc[reduxId] = [];
                }
                acc[reduxId] = acc[reduxId].concat(act.payload.actionsMap[reduxId]);
            });
        }
        return acc;
    }, {});
    return { type: ACTION_TYPE_MULTIACTION, payload: { actionsMap } };
};



module.exports = {
    ACTION_TYPE_SET, ACTION_TYPE_COMPOSED, ACTION_TYPE_MULTIACTION,
    ACTION_TYPE_ENTRY, ACTION_TYPE_REMOVE,
    ACTION_TYPE_PUSH, ACTION_TYPE_POP, ACTION_TYPE_UNSHIFT, ACTION_TYPE_SHIFT,
    ACTION_TYPE_ADD, ACTION_TYPE_SUBTRACT, ACTION_TYPE_MULTIPLY, ACTION_TYPE_DIVIDE, ACTION_TYPE_MOD, ACTION_TYPE_NEGATE, ACTION_TYPE_BW_AND, ACTION_TYPE_BW_OR, ACTION_TYPE_BW_XOR,
    ACTION_TYPE_AND, ACTION_TYPE_OR, ACTION_TYPE_XOR, ACTION_TYPE_NOT,
    ACTION_TYPE_UPPERCASE, ACTION_TYPE_LOWERCASE,

    set, compose, multiAction,
    entry, remove,
    push, pop, unshift, shift,
    add, subtract, multiply, divide, mod, negate, bitwiseAnd, bitwiseOr, bitwiseXor,
    and, or, xor, not,
    uppercase, lowercase,
};
