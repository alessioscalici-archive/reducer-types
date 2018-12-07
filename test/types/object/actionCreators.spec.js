
const {
  actionCreators: {
    entry,
    remove,
  },
  actionTypes,
} = require('../../../src/basic-types/object');


const KEY = 'someKey';
const VALUE = 'some value';


describe('entry', () => {
  it('creates an action with the correct type', () => {
    const action = entry(KEY, VALUE);
    expect(action).toBeTruthy();
    expect(action.type).toBe(actionTypes.entry);
  });

  it('creates an action with the correct properties', () => {
    const action = entry(KEY, VALUE);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.key).toBe(KEY);
    expect(action.payload.value).toBe(VALUE);
  });
});

describe('remove', () => {
  it('creates an action with the correct type', () => {
    const action = remove(KEY);
    expect(action).toBeTruthy();
    expect(action.type).toBe(actionTypes.remove);
  });

  it('creates an action with the correct properties', () => {
    const action = remove(KEY);
    expect(action).toBeTruthy();
    expect(action.payload).toBeTruthy();
    expect(action.payload.key).toBe(KEY);
  });
});
