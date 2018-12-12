# Reducers

Creating a reducer for the model is easy.

Ingredients:
- [A model](models.md)
- [A custom type set](type-sets.md) (optional)

#### Using the built-in type set

```javascript
// import the buildModuleReducer using the built-in types
const { buildModuleReducer } = require('reducer-types/types');

// we'll need a model
const myModel = require('./path/to/my-model');

// create a reducer from the model
const myModelReducer = buildModuleReducer(myModel);
```

#### Using a custom type set


```javascript
// import the buildModuleReducer factory function
const buildModuleReducer = require('reducer-types');

// we'll need a custom type set...
const myTypeSet = require('./path/to/my-typ');

// ... and a model
const myModel = require('./path/to/my-model');

// create a reducer from the model, using the custom type set
const myModelReducer = buildModuleReducer(myTypeSet)(myModel);
```
