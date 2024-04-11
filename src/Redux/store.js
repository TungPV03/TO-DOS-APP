import { STATUS_FILTER } from "../Component/App";
import filterReducer from "./filterReducer";
import todosReducer from "./todosReducer";
import { createStore } from "redux";

const rootReducer = (state, action) => {
    return{
        todos: todosReducer(state.todos, action),
        filter: filterReducer(state.filter, action)
    }
}

const initialState = {
    todos: [
        {
            id: 1,
            content: "Do something",
            completed: false
        }
    ],
    filter: {
        status: STATUS_FILTER.ALL
    }
}

const store = createStore(rootReducer, initialState);
export default store;