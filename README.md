# Work in progress

This library is still not released and its API is still unstable. It's not recommended to use yet.

A library to write reducer-based state in a concise, readable and efficient way.


## Features

- Allows to define a reducer, and many actions to interact with it, simply calling a function
- Zero dependencies
- Extremely easy to integrate
- Create new actions by grouping many actions into one. Execute the reducer only once!
- Pluggable to existing reducer-based states (e.g. existing Redux code)
- Allows to create dynamically pluggable modules easily


## Concepts

- **Action**: an object describing an operation on the state. It's serializable and it conforms to the FSA format.
- **Action creator**: a function returning an action.
- **Action handler**: (**reducer**) a function that takes the old state and the action as arguments, and returns a new state.
- **Type**: a set of action creators and action handlers.
- **Type set**: a set of types which are part of the system, and used to build reducers and action creators.
- **Type instance**: an object describing the type and the initial state of an instance.
- **Model**: a description of a state. It's a tree, and its leaves are **type instances**.


## Creating a model

`reducer-types` offers a basic configuration to help getting started. This can be found in `reducer-types/basic-types`.

```javascript

const { type } = require('reducer-types/basic-types');

// a very simple model, sescribing a number
const myNumberModel = type.number(0);

// a model describing a collection
const myCollectionModel = {
  byId: type.object({}),
  ids: type.array([]),
};

// extending a model
const myExtendedCollectionModel = {
  ...myCollectionModel,
  selectedId: type.string(null),
};

// combining models
const myStateModel = {
  someCounter: myNumberModel,
  someCollection: myExtendedCollectionModel,
};

```
This model describes an object


## Todo
- Custom action type for composed action
- Splitting functions in different files, placing private ones in a subfolder
- model distribution of types (separate npm packages exporting types)
- passing data/functions to the action handlers
