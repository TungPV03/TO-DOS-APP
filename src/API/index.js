import axios from 'axios';

const url = 'https://661f2d4c16358961cd93b3ad.mockapi.io/api/todos/';

const postTodo = (content) => {
    return (dispatch) => {
        axios.post(url, {
            content: content,
            completed: false
        }).then(response => {
            const newTodo = {
                id: response.data.id,
                content: content,
                completed: false
            };
            dispatch({ type: "todos/todoAdded", payload: newTodo });
        }).catch(error => {
            console.error(error);
        });
    };
};

const fetchTodos = () => {
    return (dispatch) => {
        axios.get(url)
            .then(response => {
                dispatch({ type: 'todos/loadedTodos', payload: response.data });
            })
            .catch(error => {
                console.error(error);
            });
    };
};

const deleteTodo = (id) => {
    return (dispatch) => {
        dispatch({type: 'todos/todoDeleted', payload: id});
        axios.delete(`${url}${id}`).then(
            res => {
                console.log(res.data);
            }
        ).catch(
            er => {console.error(er)}
        )
    }
}

const changeTodo = (action) => {
    return (dispatch) => {
        axios.put(
            `${url}${action.payload.id}`,{
                ...action.payload
            }
        ).then(response => {
            console.log(response.data);
            dispatch(action);
        }).catch(e => {
            console.error(e);
        })
    }
}

const api = {
    postTodo,
    fetchTodos,
    changeTodo,
    deleteTodo
}

export default api;