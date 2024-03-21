import React, { Component, PureComponent } from "react";
import '../CSS/Todos_List.css';
import '../CSS/CSS Dark Mode/TodosListDark.css'
import SingleTask from "./SingleTask";
import { DARK_CLASS_NAME, ThemeContext } from "./theme-context";

class TodosList extends PureComponent {
    constructor(props) {
        super(props);
    }

    tasksOfCurrentPage(tasks,currentPage){
        const firstTaskOfPage = (currentPage - 1)*5;
        const lastTaskOfPage = currentPage * 5 - 1;
        const currentTasks = tasks.slice(firstTaskOfPage,lastTaskOfPage + 1);
        return currentTasks;
    }

    render() {
        const {tasks,currentPage} = this.props;
        const currentTasks = this.tasksOfCurrentPage(tasks,currentPage);
        const {isDarkMode} = this.context;
        if(tasks.length === 0) return;
        return (
            <div className={"to-do-item-container" + (isDarkMode? DARK_CLASS_NAME : '')}>
                {currentTasks.map((task,index) =>(
                        <SingleTask
                            done={task.done} 
                            key={task.content + index}
                            task={task} index={task.oldIndex}
                            {...this.props}                 
                        />
                ))}
            </div>
        )
    }
}

TodosList.contextType = ThemeContext;

export default TodosList;
