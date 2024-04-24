import { produce } from "immer";

const todosReducer = produce((draft, action) => {
    switch (action.type){
        case "todos/todoAdded": {
            draft.push({
                ...action.payload
            });
            break;
        }
        case "todos/todoDeleted": {
            return draft.filter(todo => todo.id !== action.payload);
        }
        case "todos/todoToggleCompleted": { 
            const todo = draft.find(todo => todo.id === action.payload);
            todo.completed = !todo.completed;
            break;
        }
        case "todos/todoContentChanged": {
            const todo = draft.find(todo => todo.id === action.payload.id);
            todo.content = action.payload.content;
            break;
        }
        case "todos/todosAllToggled": {
            const completedAll = draft.every(todo => todo.completed);
            draft.forEach(todo => {
                todo.completed = !completedAll;
            });
            break;
        }
        case "todos/todosCompletedCleared": {
            return draft.filter(todo => !todo.completed);
        }
        case 'todos/loadedTodos': {
            draft.push(...action.payload);
            break;
        }
        default: {
            break;
        }
    } 
});

export default todosReducer;