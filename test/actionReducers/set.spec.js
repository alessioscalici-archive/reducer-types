
const { DEFAULT_ACTION_MAP, SET } = require('../../index');

const actionReducer = DEFAULT_ACTION_MAP[SET];

const KEY = 'someKey';
const VALUE = { hello: 'world' };

let newState;

beforeEach(() => {
  newState = actionReducer(null, { type: SET, payload: { value: VALUE } });
});

it('returns the action payload value prop as is', () => {
  expect(newState).toBe(VALUE);
});
