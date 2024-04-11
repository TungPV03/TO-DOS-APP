import React, {useContext, useState,useEffect } from "react";
import '../CSS/Todos_List.css';
import '../CSS/CSS Dark Mode/TodosListDark.css'
import SingleTask from "./SingleTask";
import { DARK_CLASS_NAME, ThemeContext } from "./ThemeProvider";
import { useScrollable } from "./ScrollableComponent";
import { shallowEqual, useSelector } from "react-redux";
import { STATUS_FILTER } from "./App";

const selectedToDoIdOnFilterStatus = (filter, todos) => {
    switch (filter.status) {
        case STATUS_FILTER.ACTIVE:
            return todos.filter(todo => !todo.completed).map(todo => todo.id);
        case STATUS_FILTER.COMPLETED:
            return todos.filter(todo => todo.completed).map(todo => todo.id);
        default:
            return todos.map(todo => todo.id);
    }
}

export default function TodosList (props){
    const [displayTodosId, setDisplayTodosId] = useState([]);
    const tasksPerPage = 7;
    const {isDarkMode} = useContext(ThemeContext);
    const {
        focusTaskInput,
        getEdittingTodoId
    } = props;
    const todosId = useSelector(state => selectedToDoIdOnFilterStatus(state.filter,state.todos), shallowEqual);
    debugger;    
    useEffect(() => {
        const reversedTodosId = [...todosId].reverse();
        setDisplayTodosId(reversedTodosId.slice(0, tasksPerPage));
    }, [todosId]);

    const loadMoreItem = () => {
        if (displayTodosId.length < todosId.length) {
            const reversedTodosId = [...todosId].reverse();
            const displayLength = displayTodosId.length;
            const loadedTasks = [...displayTodosId, ...reversedTodosId.slice(displayLength, displayLength + tasksPerPage)];
            setDisplayTodosId(loadedTasks);
        }
    }

    const {setRef, handleScroll} = useScrollable(loadMoreItem);
     
    return displayTodosId && (
        <div ref={setRef} 
            className={"to-do-item-container" + (isDarkMode ? DARK_CLASS_NAME : '')} 
            onScroll={handleScroll}>
            {displayTodosId.map((todoId) => (
                <SingleTask
                    key={todoId}
                    id={todoId}
                    focusTaskInput={focusTaskInput} 
                    getEdittingTodoId={getEdittingTodoId}           
                />
            ))}
        </div>
    )
}
