import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import '../CSS/SingleTask.css'
import '../CSS/CSS Dark Mode/SingleTaskDark.css'
import { ThemeContext, DARK_CLASS_NAME } from "./ThemeProvider";

export default function SingleTask(props){
    const [isEditing,setEditting] = useState(false);
    const changeContentInputRef = useRef();
    const { task, index, handleClickCheckTask, handleDeleteTask, done,handleChangeTaskContent } = props;
    const {isDarkMode} = useContext(ThemeContext);

    const handleChangeTask = () => {
        setEditting(prevEditting => !prevEditting);
    }

    const focusTask = useCallback(() => {
        changeContentInputRef.current.focus();
        changeContentInputRef.current.value = task.content;
    },[task.content])

    useEffect(() => {
        if(isEditing){
            focusTask();
        }
    },[isEditing,focusTask])

    const handleOnKeyDown = (event) => {
        const value = changeContentInputRef.current.value;
        if(event.keyCode === 13 && value !==''){
            handleChangeTaskContent(index, value);
            setEditting(prevEditting => !prevEditting);
        }
    }

    const handleOnBlur = () => {
        setEditting(prevEditting => !prevEditting);
    }

    return (
        <div key={index + task.content} className={"todo-item" + (isDarkMode? DARK_CLASS_NAME : '')}>
            <div className="check-container">
                <input
                    type="checkbox" readOnly
                    onClick={() => handleClickCheckTask(index)}
                    checked={done}
                    id={'checkbox' + index}
                    className="checkbox"
                />
                <label htmlFor={'checkbox' + index} className="check-btn">
                    <i className="fa-solid fa-check"></i>
                </label>
            </div>
            <p className={done ? 'task completed' : 'task'}>
                <span>{"No." + (index+1)}</span>
                {isEditing ? 
                <input type="text"
                    className="change-task-input"
                    ref={changeContentInputRef}
                    onKeyDown={handleOnKeyDown}
                    onBlur={handleOnBlur}
                />
                : task.content}
            </p>
            <button 
                className={"change-content-btn" + (isDarkMode? DARK_CLASS_NAME : "")}
                onClick={handleChangeTask}
            >
                <i className="fa-solid fa-rotate-right"></i>
            </button>
            <button className="del-btn" onClick={()=> handleDeleteTask(index)}>
                <i className="fa-solid fa-xmark"></i>
            </button>
        </div>
    )
}

