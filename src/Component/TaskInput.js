import React, { PureComponent } from 'react';
import '../CSS/Task_Input.css'
import '../CSS/CSS Dark Mode/TaskInputDarkMode.css'
import { ThemeContext, DARK_CLASS_NAME } from './ThemeProvider';

class TaskInput extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            value : '',
        }
        this.isEditing = false;
        this.textInputRef = React.createRef();
    }

    focusEditInput = (index) => {
        const {tasks} = this.props;
        this.textInputRef.current.focus();
        this.textInputRef.current.value = tasks[index].content;
    }

    handleChange = (event) =>{
        this.setState({value : event.target.value});
    }

    onKeyDown = (event) => {
        const {value} = this.state;
        const {handleChangeTaskContent,index} = this.props;
        if(event.keyCode === 13 && value !==''){
            if(!this.isEditing){
                this.textInputRef.current.value = '';
                this.setState({value : ''});
                this.props.addNewTask({
                    content : value,
                    done :false,
                })
            }
            else{
                handleChangeTaskContent(index, value);
                // handleChangeEditStatus();
                this.isEditing = false;
                this.textInputRef.current.value = '';
                this.setState({value: ''});
            }
        }
    }

    handleOnBlur = () => {
        this.isEditing = false;
        this.textInputRef.current.value = '';
        this.setState({
            value: '',
        })
    }

    render(){
        //console.log('render component taskinput');
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

export default TaskInput;
