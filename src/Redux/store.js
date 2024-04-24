import { STATUS_FILTER } from "../Component/App";
import filterReducer from "./filterReducer";
import todosReducer from "./todosReducer";
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

const rootReducer = (state, action) => {
    return{
        todos: todosReducer(state.todos, action),
        filter: filterReducer(state.filter, action)
    }
}

const initialState = {
    todos: [
    ],
    filter: {
        status: STATUS_FILTER.ALL
    }
}

const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
export default store;
