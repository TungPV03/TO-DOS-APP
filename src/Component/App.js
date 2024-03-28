import React, { PureComponent } from "react";
import TaskInput from './TaskInput';
import ScrollableComponent from "./TodosList";
import MenuFeature from "./MenuFeature";
import '../CSS/App.css';
import ThemeButton from "./ThemeButton";
import { ThemeContext, DARK_CLASS_NAME } from "./ThemeProvider";
export const STATUS_FILTER = {
    ACTIVE: "active",
    COMPLETED: "completed",
    ALL: 'all'
}
class App extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            tasks : [],
            filter : STATUS_FILTER.ALL,
            checkAllDone : false
        };
    }

    //handle event of Task Input
    addNewTask = (newTask) => {
        this.setState(prevState => {
            return {tasks : [newTask,...prevState.tasks]};
        }, () => this.checkStatusTasks());
    }

    handleClickCheckAllDone = () => {
        this.setState(prevState => {
            const checkAllDone = !prevState.checkAllDone;
            const tasks = [...prevState.tasks].map((item) => {
                item.done = checkAllDone;
                return item;
            })
            return {tasks, checkAllDone};
        });
    }

    checkStatusTasks = () => {
        const allDone = this.state.tasks.every(task => task.done);
        this.setState({ checkAllDone: allDone });
    }

    //Handle events of todolist
    handleClickCheckTask = (index) => {
        this.setState(
            prevState => {
            const tasks = [...prevState.tasks];
            const {content, done} = tasks[index];
            tasks[index] = {content, done : !done};
            return {tasks};
        }, () => this.checkStatusTasks()); 
    }

    //handle menu feature

    handleClickSetFilter = (filter) => {
        this.setState({filter});
    }

    handleClickClearCompleted = () => {
        this.setState(prevState => {
            const tasks = prevState.tasks.filter((item) => !item.done);
            return { tasks };
        }, () => {
            if(this.state.tasks.length === 0){
                this.setState({filter : STATUS_FILTER.ALL});
            }
            alert("Sẽ xoá toàn bộ công việc đã hoàn tất!");
        });
    }

    //delete task
    handleDeleteTask = (index) => {
        this.setState(prevState => {
            const tasks = [...prevState.tasks];
            tasks.splice(index,1);
            return {tasks};
        }, () => alert("Sẽ thay xoá công việc !"));
    }

    //handle change content of task
    handleChangeTaskContent = (index, newContent) => {
        this.setState(prevState => {
            const tasks =[...prevState.tasks];
            tasks[index].content = newContent;
            return {tasks};
        }, () => alert("Sẽ thay đổi nội dung công việc !"))
    }

    filterTasksBaseOnFilterStatus = (tasks, filter) => {
        if(filter === STATUS_FILTER.COMPLETED){
            return tasks.map((item,index) => ({
                ...item, oldIndex : index
            })).filter((item) => item.done);
        }
        else if(filter === STATUS_FILTER.ACTIVE){
            return tasks.map((item,index) => ({
                ...item, oldIndex : index
            })).filter((item) => !item.done);
        }
        return tasks.map((item,index) => ({
            ...item, oldIndex : index
        }));
    }

    render(){
        const {tasks,filter,checkAllDone} = this.state;
        const {isDarkMode} = this.context;
        const tasksOnFilter = this.filterTasksBaseOnFilterStatus(tasks,filter);
        return (
            <div className={"home-page" + (isDarkMode? DARK_CLASS_NAME : "")}>
                <div className={"app-container"}>
                    <ThemeButton />
                    <h1>TODOS</h1>
                    <TaskInput
                        tasks={tasks}
                        addNewTask={this.addNewTask}
                        handleClickCheckAllDone={this.handleClickCheckAllDone}
                        checkAllDone={checkAllDone}
                    />
                    <ScrollableComponent
                        tasks={tasksOnFilter}
                        handleClickCheckTask={this.handleClickCheckTask}
                        handleDeleteTask = {this.handleDeleteTask}
                        handleChangeTaskContent = {this.handleChangeTaskContent}
                    />
                    <MenuFeature
                        tasks={tasks}
                        handleClickSetFilter={this.handleClickSetFilter}
                        handleClickClearCompleted = {this.handleClickClearCompleted}
                        filter = {filter}
                    />
                </div>
            </div>
        )
    }
}

App.contextType = ThemeContext;

export default App;