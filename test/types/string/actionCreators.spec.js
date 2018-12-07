
const {
  actionCreators: {
    uppercase,
    lowercase,
  },
  actionTypes,
} = require('../../../src/basic-types/string');


describe('uppercase', () => {
  it('creates an action with the correct type', () => {
    const action = uppercase();
    expect(action).toBeTruthy();
    expect(action.type).toBe(actionTypes.uppercase);
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
    expect(action.type).toBe(actionTypes.lowercase);
  });

  it('creates an action with the correct properties', () => {
    const action = lowercase();
    expect(action).toBeTruthy();
    expect(action.payload).toBeUndefined();
  });
});
