const USERTYPE_CONFIG = {
  userType: {
    setPassword: {
      type: 'SET_PASSWORD',
      creator: newPassword => ({ type: 'SET_PASSWORD', payload: { newPassword } }),
      handler: (state, action) => (state
        ? { ...state, password: action.payload.newPassword }
        : state),
    },
  },
};

module.exports = {
  USERTYPE_CONFIG,
};
