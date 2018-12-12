
[![Build Status](https://travis-ci.org/alessioscalici/redux-router-lite.svg?branch=master)](https://travis-ci.org/alessioscalici/reducer-types)
[![npm version](https://badge.fury.io/js/reducer-types.svg)](https://badge.fury.io/js/reducer-types)
---

# Work in progress

This library is still not released and its API is still unstable. It's not recommended to use yet.
Currently consolidating the API.

A library to write reducer-based state in a concise, readable and efficient way.


## Why

State managers based on reducers and actions (like [redux](https://github.com/reduxjs/redux)) are very powerful,
but writing action and reducers for each part of the state can be very annoying and error prone.
Usually, it's possible to find common patterns in different reducers, like:
- Setting a new value
- Pushing a new value in an array
- Adding a new key-value pair in an object
- ... many more!

`reducer-types` offers a different approach for this: define common actions only once, and instantiate many reducers
which can handle the same set of actions. In this approach, a set of common actions defines a type: for example,
The "array" type might handle the "push" and the "pop" actions, and you can use those actions without repeating the code for every single array in the state.


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


## Documentation

- [Type sets](docs/type-sets.md)
- [Models](docs/models.md)
- [Reducers](docs/reducers.md)


## Todo
- Custom action type for composed action
- model distribution of types (separate npm packages exporting types)
- passing data/functions to the action handlers
- unit test type setters
- add string.replace
- create datetime type
- create a runtime typechecked types collection
- fix issue: When creating a single-type module, with no mountpoint (root), and composing the action, due to its id being '', the action is not included in the composed action
