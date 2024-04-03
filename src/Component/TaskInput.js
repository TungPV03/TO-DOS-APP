import React, { useContext, useRef } from 'react';
import '../CSS/Task_Input.css'
import '../CSS/CSS Dark Mode/TaskInputDarkMode.css'
import { ThemeContext, DARK_CLASS_NAME } from './ThemeProvider';
import PropTypes from 'prop-types';

export default function TaskInput (props){
    const {tasks,handleClickCheckAllDone,checkAllDone} = props; 
    const {isDarkMode} = useContext(ThemeContext);
    const textInputRef = useRef();

    const onKeyDown = (event) => {
        const value = textInputRef.current.value;
        if(event.keyCode === 13 && value !==''){
            textInputRef.current.value = '';
            props.addNewTask({
                content : value,
                done :false,
            });
        }
    }

    return(
        <div className='todo-container'>
            <div className={ 'task-input-container' + (isDarkMode ? DARK_CLASS_NAME : '')}>
                <span 
                    className={tasks.length > 0 ? 'check-all' : 'check-all hidden'}
                    onClick={handleClickCheckAllDone}>
                    <i className={checkAllDone ? "fa-solid fa-caret-up all-done" : "fa-solid fa-caret-down"}></i>
                </span>
                <input
                    className={'text-input' + (isDarkMode? DARK_CLASS_NAME : '')}
                    type='text'
                    placeholder='Please enter what you need to do'
                    onKeyDown={onKeyDown}
                    ref={textInputRef}
                />
            </div>
        </div>
    )
}

TaskInput.propTypes = {
    tasks : PropTypes.array,
    checkAllDone: PropTypes.bool,
    handleClickCheckAllDone: PropTypes.func,
    addNewTask: PropTypes.func
}

TaskInput.defaultProps = {
    tasks : [],
    checkAllDone : false
}
