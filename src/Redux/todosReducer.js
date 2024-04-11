function nextId(todos) {
    const todosLength = todos.length;
    if (todosLength === 0) {
        return 0;
    }
    return todos[todosLength - 1].id + 1;
}


const todosReducer = (state, action) => {
    switch (action.type){
        case "todos/todoAdded": {
            return [
                ...state,
                {
                    id: nextId(state),
                    content: action.payload,
                    completed: false 
                }
            ];
        }
        case "todos/todoDeleted": {
            return state.filter(todo => todo.id !== action.payload);
        }
        case "todos/todoToggleCompleted": { 
            return state.map(todo => {
                if(todo.id === action.payload){
                    return {...todo, completed: !todo.completed};
                }
                return todo;
            })
        }
        case "todos/todoContentChanged": {
            return state.map(todo => {
                if(todo.id === action.payload.id){
                    return {
                        ...todo,
                        content: action.payload.content
                    };
                }
                return todo;
            })
        }
        case "todos/todosAllToggled": {
            const completedAll = state.every(todo => todo.completed);
            return state.map(todo => ({...todo, completed: !completedAll}));
        }
        case "todos/todosCompletedCleared": {
            return state.filter(todo => !todo.completed);
        }
        default: {
            return state;
        }
    } 
}

export default todosReducer;