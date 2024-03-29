import React, { PureComponent } from 'react';
import '../CSS/Task_Input.css'
import '../CSS/CSS Dark Mode/TaskInputDarkMode.css'
import { ThemeContext, DARK_CLASS_NAME } from './ThemeProvider';
import PropTypes from 'prop-types';

class TaskInput extends PureComponent{
    constructor(props){
        super(props);
        this.textInputRef = React.createRef();
    }

    onKeyDown = (event) => {
        const value = this.textInputRef.current.value;
        if(event.keyCode === 13 && value !==''){
            this.textInputRef.current.value = '';
            this.props.addNewTask({
                content : value,
                done :false,
            });
        }
    }

    render(){
        const {tasks,handleClickCheckAllDone,checkAllDone} = this.props; 
        const {isDarkMode} = this.context;
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
                        onChange={this.handleChange}
                        placeholder='Please enter what you need to do'
                        onKeyDown={this.onKeyDown}
                        onBlur={this.handleOnBlur}
                        ref={this.textInputRef}
                    />
                </div>
            </div>
        )
    }
}

TaskInput.contextType=ThemeContext;
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

export default TaskInput;
