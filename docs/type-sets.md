# Type sets

A type set is a plain JS object, that maps the type names to the types.

Here is a simple, valid type set:

```javascript
const myTypeSet = {
  number: {
    set: {
      type: 'NUMBER_SET',
      creator: value => ({ type: 'NUMBER_SET', payload: { value } }),
      handler: (state, action) => action.payload.value,
    },
  },
};
```

In this example, we have a type called `number`, with an action called `set`.
The action object has 3 mandatory properties:
- `type`: the action unique type
- `creator`: the action creator function. It's a function returning an action.
- `handler`: the function that will be called in the reducer, in response to this action. It should return a new state.



## Built-in type set

`reducer-types` provides a built-in type set, containing common data types and basic actions.
This is contained in the `reducer-types/types` sub-module.

It contains the following types and related actions:

- **array**
  - `set(value)`: sets a new value (must be an Array)
  - `push(value)`: adds a new element at the end of the array
  - `pop()`: removes an element from the end of the array
  - `shift()`: removes an element from the beginning of the array
  - `unshift(value)`: adds a new element at the beginning of the array
- **boolean**
  - `set(value)`: sets a new value (must be a boolean)
  - `and`
  - `or`
  - `xor`
  - `not`
- **number**
  - `set(value)`: sets a new value (must be a number)
  - `add`
  - `subtract`
  - `multiply`
  - `divide`
  - `mod`
  - `not`
  - `and`
  - `or`
  - `xor`
- **object**
  - `set(value)`: sets a new value (must be an object)
  - `entry`
  - `remove`
- **string**
  - `set(value)`: sets a new value (must be a string)
  - `uppercase`
  - `lowercase`

## Custom type sets

It's possible to create models based on a custom type set, or extending the built-in one.
A type set is a plain JS object, with the type names as keys, and the type objects as values.

E.g. here is an example of custom type set:

```javascript
// my-type-set.js

// import type objects
import dateTime from './my-types/dateTime';
import user from './my-types/user';

// export a type set containing the 'dateTime' and the 'user' types
export default {
  dateTime,
  user,
};
```

This custom type set can be used to define models, like:

```javascript
// my-current-user-model.js

import initTypeDescriptors from 'reducer-types';
import myTypeSet from './my-type-set';

const type = initTypeDescriptors(myTypeSet);

const myCurrentUserModel = {
  user: type.user(null),
  loginTime: type.dateTime(null),
};

// export the model
export default myCurrentUserModel;
```
