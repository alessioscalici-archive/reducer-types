# Type sets

A type set is a set of types, that can be used to defined a model.

`reducer-types` provides a built-in type set, containing common data types and basic actions.
This is contained in the `reducer-types/types` sub-module.

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
