import React, { PureComponent } from "react";
import '../CSS/SingleTask.css'
import '../CSS/CSS Dark Mode/SingleTaskDark.css'
import { ThemeContext, DARK_CLASS_NAME } from "./ThemeProvider";

class SingleTask extends PureComponent {
    handleDoubleClick = () => {
        const {
                index,
                handleFocusTaskInput,
                hanldeTargetChangingTask} = this.props;
        handleFocusTaskInput(index);
        hanldeTargetChangingTask(index);
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
                <p className={done ? 'task completed' : 'task'}
                    // onDoubleClick={this.handleDoubleClick}
                    onDoubleClick={this.handleDoubleClick}
                >
                    {task.content}
                </p>
                <button className="del-btn" onClick={() => handleDeleteTask(index)}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        )
    }
}

SingleTask.contextType = ThemeContext;

export default SingleTask
