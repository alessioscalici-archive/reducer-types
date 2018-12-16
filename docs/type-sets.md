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


### array

| Action         | Mutable equivalent    | Description |
| ----------     | ------------------    | ----------- |
| set(value)     | state = value;        | sets a new value (must be an Array, or `null` will be set) |
| push(value)    | state.push(value);    | adds a new element at the end of the array |
| pop()          | state.pop();          | removes an element from the end of the array |
| shift()        | state.shift();        | removes an element from the beginning of the array |
| unshift(value) | state.unshift(value); | adds a new element at the beginning of the array |

### boolean

| Action         | Mutable equivalent                | Description |
| ----------     | ------------------                | ----------- |
| set(value)     | state = value;                    | sets a new value (must be a boolean, or `null` will be set) |
| and(value)     | state = state && value;           | applies logical AND operator to the current state |
| or(value)      | state = state &#124;&#124; value; | applies logical OR operator to the current state |
| xor(value)     | state = state ? !value : value;   | applies logical XOR operator to the current state |
| not()          | state = !state;                   | applies logical NOT operator to the current state |

### number

| Action          | Mutable equivalent               | Description |
| ----------      | ------------------               | ----------- |
| set(value)      | state = value;                   | sets a new value (must be a number, or `null` will be set) |
| add(value)      | state = state + value;           | adds value to the current state |
| subtract(value) | state = state - value;           | subtracts value from the current state |
| multiply(value) | state = state * value;           | multiplies the current state by value |
| divide(value)   | state = state / value;           | divides the current state by value |
| mod(value)      | state = state % value;           | applies the module operator to the current state |
| not()           | state = -state;                  | negates the current state |
| and(value)      | state = state & value;           | applies the bitwise AND operator to the current state |
| or(value)       | state = state &#124; value;      | applies the bitwise OR operator to the current state |
| xor(value)      | state = state ^ value;           | applies the bitwise XOR operator to the current state |

### object

| Action            | Mutable equivalent             | Description |
| ----------        | ------------------             | ----------- |
| set(value)        | state = value;                 | sets a new value (must be an Object, or `null` will be set) |
| entry(key, value) | state[key] = value;            | sets a new property to the current state |
| remove(key)       | delete state[key];             | deletes a property from the current state |

### string

| Action            | Mutable equivalent             | Description |
| ----------        | ------------------             | ----------- |
| set(value)        | state = value;                 | sets a new value (must be a string, or `null` will be set) |
| uppercase()       | state = state.toUpperCase();   | transforms the current state to an upper case string |
| lowercase()       | state = state.toLowerCase();   | transforms the current state to a lower case string |


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
