# redules

A library to write reducer-based state in a concise, readable and efficient way.


## Features

- Allows to define a reducer, and many actions to interact with it, simply calling a function
- Extremely easy to integrate
- Create new actions by grouping many actions into one. Execute the reducer only once!
- Usable with existing reducer-based states (e.g. existing Redux code)


## TODO:

- Rename multiaction
- Rename bindActionCreator

- Unit test all types
  - validator
  - actionHandlers
  - actionCreators
  - type structure
- Unit test multiaction
- unit test generateCreateReducer
- unit test mergetypes
- unit test mergeconfigs
- unit test typeDescriptor
