import React, { PureComponent } from "react";
import '../CSS/SingleTask.css'
import '../CSS/CSS Dark Mode/SingleTaskDark.css'
import { ThemeContext, DARK_CLASS_NAME } from "./ThemeProvider";

class SingleTask extends PureComponent {
    constructor(props){
        super(props);
        this.state = {isEditing : false}
        this.changeContentInputRef = React.createRef();
    }
    
    handleChangeTask = () => {
       this.setState({isEditing : true},
        () => this.focusTask())
    }

    focusTask = () => {
        const {task} = this.props;
        this.changeContentInputRef.current.focus();
        this.changeContentInputRef.current.value = task.content;
    }

    handleOnKeyDown = (event) => {
        const {index,handleChangeTaskContent} = this.props;
        const value = this.changeContentInputRef.current.value;
        if(event.keyCode === 13 && value !==''){
            handleChangeTaskContent(index, value);
            this.setState({isEditing : false})
        }
    }

    handleOnBlur = () => {
        this.setState({isEditing : false});
    }

    render() {
        const { task, index, handleClickCheckTask, handleDeleteTask, done } = this.props;
        const {isDarkMode} = this.context;
        return (
            <div key={index + task.content} className={"todo-item" + (isDarkMode? DARK_CLASS_NAME : '')}>
                <div className="check-container">
                    <input
                        type="checkbox" readOnly
                        onClick={() => { handleClickCheckTask(index) }}
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
                    {this.state.isEditing ? 
                    <input type="text"
                        className="change-task-input"
                        ref={this.changeContentInputRef}
                        onKeyDown={this.handleOnKeyDown}
                        onBlur={this.handleOnBlur}
                    />
                    : task.content}
                </p>
                <button 
                    className={"change-content-btn" + (isDarkMode? DARK_CLASS_NAME : "")}
                    onClick={this.handleChangeTask}
                >
                    <i className="fa-solid fa-rotate-right"></i>
                </button>
                <button className="del-btn" onClick={() => handleDeleteTask(index)}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        )
    }
}

SingleTask.contextType = ThemeContext;

export default SingleTask
