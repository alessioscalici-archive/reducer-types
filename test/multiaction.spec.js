
const {
  multiAction, MULTIACTION,
} = require('../src/redux-modules.js');


const TARGET_ID_1 = 'TARGET_ID_1';
const TARGET_ID_2 = 'TARGET_ID_2';

const ACTION_1 = { type: 'ACTION_1', meta: { reduxId: TARGET_ID_1 } };
const ACTION_2 = { type: 'ACTION_2', meta: { reduxId: TARGET_ID_2 }  };
const ACTION_3 = { type: 'ACTION_3', meta: { reduxId: TARGET_ID_1 }  };


describe('multiAction(...) creates an action', () => {

  let action = null;

  beforeEach(() => {
    action = multiAction(ACTION_1, ACTION_2, ACTION_3);
  });

  it('with the correct type', () => {
    expect(action).toBeTruthy();
    expect(action.type).toBe(MULTIACTION);
  });

  it('with a map of actions in the payload', () => {
    expect(action.payload).toBeTruthy();
    expect(action.payload.actionsMap).toBeTruthy();
  });

  it('with actions mapped by target', () => {
    const keys = Object.keys(action.payload.actionsMap);

    expect(keys.length).toBe(2);
    expect(keys).toContain(TARGET_ID_1);
    expect(keys).toContain(TARGET_ID_2);
  });

  it('each target has an array of actions', () => {
    const actionsForTarget1 = action.payload.actionsMap[TARGET_ID_1];
    const actionsForTarget2 = action.payload.actionsMap[TARGET_ID_2];

    expect(actionsForTarget1).toEqual([ACTION_1, ACTION_3]);
    expect(actionsForTarget2).toEqual([ACTION_2]);
  });
});
