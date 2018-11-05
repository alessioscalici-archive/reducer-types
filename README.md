# redules

A library to write reducer-based state in a concise, readable and efficient way.


## Features

- Allows to define a reducer, and many actions to interact with it, simply calling a function
- Extremely easy to integrate
- Create new actions by grouping many actions into one. Execute the reducer only once!
- Usable with existing reducer-based states (e.g. existing Redux code)


## TODO:

- Custom type (providing unique name, type checker, set of actions)

```


Custom types:
{
  <type name>: {
    validate: fn any -> boolean,
    actionHandlers: {
      <action type>: fn (state, action) -> state,
    },
    actionCreators: {
      <action creator name>: fn any* -> action object
    }
  }
}

const customTypes = {
  USER: {
    validate: user => (user === null || user.id && user.username && user.password),
    actionHandlers: {
      CHANGE_PASSWORD: (state, action) => ({ ...state, password: action.payload.newPassword })
    },
    actionCreators: {
      changePassword: newPassword => ({ type: CHANGE_PASSWORD, payload: { newPassword } })
    }
  }
};

const functions = setCustomTypes(customTypes);

functions.bindActionCreator
functions.generateReducer
function.generateActions


```
