import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import '../CSS/Task_Input.css'
import '../CSS/CSS Dark Mode/TaskInputDarkMode.css'
import { ThemeContext, DARK_CLASS_NAME } from './ThemeProvider';
import { useDispatch, useSelector } from 'react-redux';
import api from '../API';

const TaskInput = forwardRef( function TaskInput (props, ref){
    const {isDarkMode} = useContext(ThemeContext);
    const todos = useSelector(state => state.todos);
    const areAllCompleted = todos.every(todo => todo.completed);
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    let edditingStatus = false;
    let edittingId = 0;


    const setEdittingStatus = () => {
        edditingStatus = true;
    }

    const focusTaskInput = (content, id) => {
        inputRef.current.focus();
        inputRef.current.value = content;
        edittingId = id;
    }

    useImperativeHandle(ref, () => ({
        setEdittingStatus: setEdittingStatus,
        focusTaskInput: focusTaskInput
    }));

    const onKeyDown = (event) => {
        const value = inputRef.current.value;
        if(event.keyCode === 13 && value !==''){
            if(!edditingStatus){
                dispatch(api.postTodo(value));
            }
            else{
                //dispatch({type: "todos/todoContentChanged", payload: {id: edittingId, content: value}});
                dispatch(api.changeTodo({type: "todos/todoContentChanged", payload: {id: edittingId, content: value}}));
                edditingStatus = false;
            }
            inputRef.current.value = "";
        }
    }

    const handleBlur = () => {
        edditingStatus = false;
        inputRef.current.value = "";
    }

    return(
        <div className='todo-container'>
            <div className={ 'task-input-container' + (isDarkMode ? DARK_CLASS_NAME : '')}>
                <span 
                    className={todos.length > 0 ? 'check-all' : 'check-all hidden'}
                    onClick={() => dispatch({type: "todos/todosAllToggled"})}>
                    <i className={areAllCompleted ? "fa-solid fa-caret-up all-done" : "fa-solid fa-caret-down"}></i>
                </span>
                <input
                    className={'text-input' + (isDarkMode? DARK_CLASS_NAME : '')}
                    type='text'
                    placeholder='Please enter what you need to do'
                    onKeyDown={onKeyDown}
                    onBlur={handleBlur}
                    ref={inputRef}
                />
            </div>
        </div>
    )
})

export default TaskInput;
