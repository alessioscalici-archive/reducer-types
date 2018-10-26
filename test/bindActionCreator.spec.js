
const {
  bindActionCreator,
} = require('../index');


const TARGET_ID = 'TARGET_ID';




describe('with an action creator which creates an action with no meta', () => {
  const originalActionCreator = () => ({
    type: 'do-something',
  });
  const actionCreator = bindActionCreator(TARGET_ID)(originalActionCreator);


  it('adds the meta to the action', () => {
    const action = actionCreator();
    expect(action).toEqual({
      type: 'do-something',
      meta: {
        reduxId: TARGET_ID,
      },
    });
  });
});

describe('with an action creator which creates an action with meta', () => {
  const originalActionCreator = () => ({
    type: 'do-something',
    meta: {
      some: 'metadata',
    },
  });
  const actionCreator = bindActionCreator(TARGET_ID)(originalActionCreator);


  it('adds the reduxId to the meta', () => {
    const action = actionCreator();

    expect(action).toEqual({
      type: 'do-something',
      meta: {
        some: 'metadata',
        reduxId: TARGET_ID,
      },
    });
  });
});

describe('with an action creator which creates an action with meta and reduxId', () => {
  const originalActionCreator = () => ({
    type: 'do-something',
    meta: {
      some: 'metadata',
      reduxId: 'some-other-id',
    },
  });
  const actionCreator = bindActionCreator(TARGET_ID)(originalActionCreator);


  it('overwrites the reduxId in the meta', () => {
    const action = actionCreator();

    expect(action).toEqual({
      type: 'do-something',
      meta: {
        some: 'metadata',
        reduxId: TARGET_ID,
      },
    });
  });
});
