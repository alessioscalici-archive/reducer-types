# Models

Creating a model using the built-in types is very easy: just create a JSON object,
and create type instances as leaves:

E.g. a model for a to-do application could look like this:

```javascript

const { type } = require('reducer-types/types');


// a model containing an array called todoList
const todosModel = {
  todoList: type.array([]),
};

```


Models can be nested at arbitrary levels, for example:

```javascript

const { type } = require('reducer-types/types');


// a model containing an array at the path todos.list, and a string at the path todos.currentTodoId
const todosModel = {
  todos: {
    list: type.array([]),
    currentTodoId: type.string(''),
  },
};

```


Models can be combined as normal JSON objects:

```javascript

const { type } = require('reducer-types/types');


const todosModel = {
  list: type.array([]),
  currentTodoId: type.string(''),
};

const usersModel = {
  list: type.array([]),
  currentUserId: type.string(''),
};

const myAppModel = {
  todos: todosModel,
  users: usersModel,
};

```
