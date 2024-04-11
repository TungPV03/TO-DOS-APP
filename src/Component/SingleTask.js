import React, {useContext } from "react";
import '../CSS/SingleTask.css'
import '../CSS/CSS Dark Mode/SingleTaskDark.css'
import { ThemeContext, DARK_CLASS_NAME } from "./ThemeProvider";
import { useDispatch, useSelector } from "react-redux";

export default function SingleTask(props){
    const { 
        id,
        getEdittingTodoId,
        focusTaskInput
        } = props;
    const {isDarkMode} = useContext(ThemeContext);

    const todo = useSelector(state => state.todos.find(todo => todo.id === id));
    const dispatch = useDispatch();

    const handleEdittingTask = () => {
        getEdittingTodoId(id);
        focusTaskInput(todo.content);
    }

    return todo && (
        <div className={"todo-item" + (isDarkMode? DARK_CLASS_NAME : '')}>
            <div className="check-container">
                <input
                    type="checkbox" readOnly
                    onClick={() => dispatch({type:"todos/todoToggleCompleted", payload: id})}
                    checked={todo.completed}
                    id={'checkbox' + id}
                    className="checkbox"
                />
                <label htmlFor={'checkbox' + id} className="check-btn">
                    <i className="fa-solid fa-check"></i>
                </label>
            </div>
            <p className={todo.completed ? 'task completed' : 'task'}>
                {todo.content}
            </p>
            <button 
                className={"change-content-btn" + (isDarkMode? DARK_CLASS_NAME : "")}
                onClick={handleEdittingTask}
            >
                <i className="fa-solid fa-rotate-right"></i>
            </button>
            <button className="del-btn" onClick={() => dispatch({type:"todos/todoDeleted", payload: id})}>
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>
    )
}

