import {
  CREATE_TODO_FAIL,
  CREATE_TODO_REQUEST,
  CREATE_TODO_RESET,
  CREATE_TODO_SUCCESS,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  TODO_LOAD_FAIL,
  TODO_LOAD_REQUEST,
  TODO_LOAD_RESET,
  TODO_LOAD_SUCCESS,
  UPDATE_TODO_FAIL,
  UPDATE_TODO_REQUEST,
  UPDATE_TODO_RESET,
  UPDATE_TODO_SUCCESS,
} from "../constants/todoConstant";


// load job type reducer
export const loadTodoReducer = (
  state = ( { todos: [] }),
  action
) => {
  switch (action.type) {
    case TODO_LOAD_REQUEST:
      return { loading: true };
    case TODO_LOAD_SUCCESS:
      return {
        loading: false,
        todos: action.payload.todos,
      };
    case TODO_LOAD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case TODO_LOAD_RESET:
      return {};
    default:
      return state;
  }
};

// create job type reducer
export const createtodoReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TODO_REQUEST:
      return { loading: true };
    case CREATE_TODO_SUCCESS:
      return {
        loading: false,
        todo: action.payload,
      };
    case CREATE_TODO_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_TODO_RESET:
      return {};
    default:
      return state;
  }
};

//Update
export const todoUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_TODO_REQUEST:
        return { loading: true };
      case UPDATE_TODO_SUCCESS:
        return { loading: false, success: true, todo: action.payload };
      case UPDATE_TODO_FAIL:
        return { loading: false, error: action.payload };
      case UPDATE_TODO_RESET:
        return {};
      default:
        return state;
    }
  };

//Delete
export const deleteTodoReducer = (
  state = ( { todo: [] }),
  action
) => {
  switch (action.type) {
    case DELETE_TODO_REQUEST:
      return { loading: true };
    case DELETE_TODO_SUCCESS:
      const updatedtodos = state?.todo?.filter(
        (todo) => todo._id !== action.payload
      );
      return {
        ...state,
        todo: updatedtodos,
      };
    default:
      return state;
  }
};

