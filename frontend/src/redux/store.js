import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { createtodoReducer, deleteTodoReducer, loadTodoReducer, todoUpdateReducer } from './reducers/todoReducer';

//combine reducers
const reducer = combineReducers({
    loadTodos:loadTodoReducer,
    createTodo:createtodoReducer,
    updateTodo:todoUpdateReducer,
    deleteTodo:deleteTodoReducer
    

});


//initial state
let initialState = {};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;