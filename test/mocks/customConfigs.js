const USERTYPE_CONFIG = {
  userType: {
    actionHandlers: {
      SET_PASSWORD: (state, action) => (state
        ? { ...state, password: action.payload.newPassword }
        : state),
    },
    actionCreators: {
      setPassword: newPassword => ({ type: 'SET_PASSWORD', payload: { newPassword } }),
    },
  },
};

module.exports = {
  USERTYPE_CONFIG,
};
