import React, { PureComponent } from "react";
import TaskInput from './TaskInput';
import TodosList from "./TodosList";
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
            checkAllDone : false,
            filter : STATUS_FILTER.ALL,
            currentPage : 1,
        };
        this.targetTask = 0;
        this.taskInputRef = React.createRef();
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

    handleFocusTaskInput = (index) => {
        this.taskInputRef.current.focusEditInput(index);
        this.taskInputRef.current.isEditing = true;

    }
    //Handle events of todolist
    handleClickCheckTask = (index) => {
        this.setState(prevState => {
            const tasks = [...prevState.tasks];
            const {content, done} = tasks[index];
            tasks[index] = {content, done : !done};
            return {tasks};
        }, () => this.checkStatusTasks());
    }

    //handle menu feature

    handleClickSetFilter = (filter) => {
        this.setState({filter, currentPage:1});
    }

    handleClickClearCompleted = () => {
        this.setState(prevState => {
            const tasks = prevState.tasks.filter((item) => !item.done);
            return { tasks };
        });
    }

    //delete task
    handleDeleteTask = (index) => {
        this.setState(prevState => {
            const tasks = [...prevState.tasks];
            tasks.splice(index,1);
            //console.log('tasks after delete: ', tasks);
            return {tasks};
        });
    }
    //Select page number

    // handleSelectPageNumber = (event) => {
    //     const currentPage = event.target.value;
    //     this.setState({currentPage});
    // }

    //handle change content of task
    handleChangeTaskContent = (index, newContent) => {
        this.setState(prevState => {
            const tasks =[...prevState.tasks];
            tasks[index].content = newContent;
            return {tasks};
        })
    }
    hanldeTargetChangingTask = (index) =>{
        this.targetTask = index;
    }

    //render

    render(){
        const {tasks,checkAllDone,filter,currentPage} = this.state;
        let currentFilterTasks = [];
        if(filter === STATUS_FILTER.COMPLETED){
            currentFilterTasks = tasks.map((item,index) => ({
                ...item, oldIndex : index
            })).filter((item) => item.done);
        }
        else if(filter === STATUS_FILTER.ACTIVE){
            currentFilterTasks = tasks.map((item,index) => ({
                ...item, oldIndex : index
            })).filter((item) => !item.done);
        }
        else {
            currentFilterTasks = tasks.map((item,index) => ({
                ...item, oldIndex : index
            }));
        }
        const {isEditing} = this.state;
        const {isDarkMode} = this.context;
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
                        takeTaskInputRef ={this.takeTaskInputRef}
                        isEditing = {isEditing}
                        handleChangeTaskContent = {this.handleChangeTaskContent}
                        index= {this.targetTask}
                        ref={this.taskInputRef}
                    />
                    <MenuFeature
                        tasks={tasks}
                        handleClickSetFilter={this.handleClickSetFilter}
                        handleClickClearCompleted = {this.handleClickClearCompleted}
                        handleSelectPageNumber = {this.handleSelectPageNumber}
                        filter = {filter}
                        currentPage = {currentPage}
                        currentFilterTasks={currentFilterTasks}
                    />
                    <TodosList
                        tasks={currentFilterTasks}//tasks
                        handleClickCheckTask={this.handleClickCheckTask}
                        handleDeleteTask = {this.handleDeleteTask}
                        currentPage = {currentPage}
                        handleFocusTaskInput = {this.handleFocusTaskInput}
                        hanldeTargetChangingTask = {this.hanldeTargetChangingTask}
                        handleChangePageOnScroll = {this.handleChangePageOnScroll}
                    />
                </div>
            </div>
        )
    }
}

App.contextType = ThemeContext;

export default App;