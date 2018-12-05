
const buildModuleReducer = require('../src/buildModuleReducer');
const buildModuleActions = require('../src/buildModuleActions');
const initTypeDescriptors = require('../src/initTypeDescriptors');

const { compose } = require('../src/actions');


const TYPE_SET = {
  myArray: {
    actionHandlers: {
      push: (state, action, params) => {
        if (params.validate && params.validate(action.payload.value)) {
          return [...state, action.payload.value];
        }
        return state;
      },
    },
    actionCreators: {
      push: value => ({ type: 'push', payload: { value } }),
    },
  },
};

const type = initTypeDescriptors(TYPE_SET);


const validateMock = jest.fn(v => (typeof v === 'string'));

const model = {
  myArray: type.myArray([], { validate: validateMock }),
};


const reducer = buildModuleReducer(TYPE_SET)(model)();
const actions = buildModuleActions(TYPE_SET)(model)();

beforeEach(() => {
  validateMock.mockClear();
});

it('should call the param validate on push action', () => {
  const state = reducer(undefined, actions.myArray.push('pippo'));
  expect(validateMock).toHaveBeenCalledWith('pippo');
  expect(state).toEqual({ myArray: ['pippo'] });
});

it('should call the param validate on push action when composed', () => {
  const state = reducer([], compose(actions.myArray.push('pippo')));
  expect(validateMock).toHaveBeenCalledWith('pippo');
  expect(state).toEqual({ myArray: ['pippo'] });
});
