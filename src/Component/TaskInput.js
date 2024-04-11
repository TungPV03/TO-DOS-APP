import React, { forwardRef, useContext } from 'react';
import '../CSS/Task_Input.css'
import '../CSS/CSS Dark Mode/TaskInputDarkMode.css'
import { ThemeContext, DARK_CLASS_NAME } from './ThemeProvider';
import { useDispatch, useSelector } from 'react-redux';


const TaskInput = forwardRef( function TaskInput (props, ref){
    const {
        edittingId,
        clearEdittingStatus,
        isEditting} = props; 
    const {isDarkMode} = useContext(ThemeContext);
    const todos = useSelector(state => state.todos);
    const areAllCompleted = todos.every(todo => todo.completed);
    const dispatch = useDispatch();
    debugger;

    const onKeyDown = (event) => {
        const value = ref.current.value;
        if(event.keyCode === 13 && value !==''){
            if(!isEditting){
                dispatch({type: "todos/todoAdded", payload: value});
            }
            else{
                dispatch({type: "todos/todoContentChanged", payload: {id: edittingId, content: value}});
                clearEdittingStatus();
            }
            ref.current.value = "";
        }
    }

    const handleBlur = () => {
        clearEdittingStatus();
        ref.current.value = "";
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
                    ref={ref}
                />
            </div>
        </div>
    )
})

export default TaskInput;
