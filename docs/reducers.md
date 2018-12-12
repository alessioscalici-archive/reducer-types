# Reducers

Creating a reducer for the model is easy.

Ingredients:
- [A model](models.md)
- [A custom type set](type-sets.md) (optional)

#### Using the built-in type set

```javascript
// import the buildModuleReducer using the built-in types
import { buildModuleReducer } from 'reducer-types/types';

// we'll need a model
import myModel from './path/to/my-model';

// create a reducer from the model
const myModelReducer = buildModuleReducer(myModel);
```

#### Using a custom type set


```javascript
// import the buildModuleReducer factory function
import buildModuleReducer from 'reducer-types';

// we'll need a custom type set...
import myTypeSet from './path/to/my-typ';

// ... and a model
import myModelfrom './path/to/my-model';

// create a reducer from the model, using the custom type set
const myModelReducer = buildModuleReducer(myTypeSet)(myModel);
```
