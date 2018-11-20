
const {
  actionCreators: {
    uppercase,
    lowercase,
  },
  actionTypes: {
    ACTION_TYPE_UPPERCASE,
    ACTION_TYPE_LOWERCASE,
  },
} = require('../../../src/basic-types/string');


describe('uppercase', () => {
  it('creates an action with the correct type', () => {
    const action = uppercase();
    expect(action).toBeTruthy();
    expect(action.type).toBe(ACTION_TYPE_UPPERCASE);
  });

  it('creates an action with the correct properties', () => {
    const action = uppercase();
    expect(action).toBeTruthy();
    expect(action.payload).toBeUndefined();
  });
});


describe('lowercase', () => {
  it('creates an action with the correct type', () => {
    const action = lowercase();
    expect(action).toBeTruthy();
    expect(action.type).toBe(ACTION_TYPE_LOWERCASE);
  });

  it('creates an action with the correct properties', () => {
    const action = lowercase();
    expect(action).toBeTruthy();
    expect(action.payload).toBeUndefined();
  });
});
