
const { DEFAULT_ACTION_MAP, POP } = require('../../index');


const actionReducer = DEFAULT_ACTION_MAP[POP];

const oldState = [ { key: 'value' }, { newKey: 'newValue' } ];

let newState;


describe('when the state is null', () => {
  beforeEach(() => {
    newState = actionReducer(null, { type: POP });
  });

  it('returns null (does not crash)', () => {
    expect(newState).toBe(null);
  });
});

describe('when the state is not an Array', () => {
  const notAnArray = { something: 'is wrong!' };
  beforeEach(() => {
    newState = actionReducer(notAnArray, { type: POP });
  });

  it('returns the old state (does not crash)', () => {
    expect(newState).toBe(notAnArray);
  });
});


describe('when state is an Array', () => {
  beforeEach(() => {
    newState = actionReducer(oldState, { type: POP });
  });

  it('returns a new state (immutability)', () => {
    expect(oldState).not.toBe(newState);
  });

  it('new state length will be deremented by 1', () => {
    expect(newState.length).toBe(oldState.length - 1);
  });

  it('the new state will equal first part of the old state', () => {
    expect(newState).toEqual(oldState.slice(0, oldState.length - 1));
  });
});
