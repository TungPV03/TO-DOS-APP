import React, { Component, PureComponent } from "react";
import TaskInput from './TaskInput';
import TodosList from "./TodosList";
import MenuFeature from "./MenuFeature";
import '../CSS/App.css';
import { ThemeContext, THEME } from "./theme-context";
import ThemeButton from "./ThemeButton";
export const STATUS_FILTER = {
    ACTIVE: "active",
    COMPLETED: "completed",
    ALL: 'all'
}

class App extends PureComponent {
    constructor(props){
        super(props);
        this.toggleChangeTheme = () => {
            this.setState(prevState => ({
                theme : prevState.theme === THEME.light
                        ? THEME.dark : THEME.light,
                isDarkMode: !prevState.isDarkMode
            }))
        }
        this.state = {
            tasks : [],
            checkAllDone : false,
            filter : STATUS_FILTER.ALL,
            currentPage : 1,
            theme : THEME.light,
            isDarkMode: false,
            toggleChangeTheme : this.toggleChangeTheme,
            taskInputRef : null,
            isEditing : false,
            targetTask : 0,
        };
    }
    //lyfe circle

    componentDidMount = () => {
        const {theme} = this.state;
        document.body.style.backgroundColor = theme.backgroundColor;
        document.body.style.color = theme.color;
    }

    componentDidUpdate = () => {
        const {theme} = this.state;
        document.body.style.backgroundColor = theme.backgroundColor;
        document.body.style.color = theme.color;
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

    takeTaskInputRef = (taskInputRef) => {
        this.setState({taskInputRef});
    }

    handleFocusTaskInput = (index) => {
        const {taskInputRef,tasks} = this.state
        if(taskInputRef){
            taskInputRef.current.focus();
            taskInputRef.current.value = tasks[index].content;
            this.setState({isEditing: true});
        }
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

    handleSelectPageNumber = (event) => {
        const currentPage = event.target.value;
        this.setState({currentPage});
    }

    //handle change content of task
    handleChangeTaskContent = (index, newContent) => {
        this.setState(prevState => {
            const tasks =[...prevState.tasks];
            tasks[index].content = newContent;
            return {tasks};
        })
    }
    handleChangeEditStatus = () =>{
        this.setState({isEditing : false});
    }
    hanldeTargetChangingTask = (index) =>{
        this.setState({targetTask : index})
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
        const {theme,
                isDarkMode,
                toggleChangeTheme,
                isEditing,
                targetTask,
                } = this.state;
        return (
            <div className="app-container">
                <ThemeContext.Provider value={{theme,isDarkMode,toggleChangeTheme}}>
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
                        index= {targetTask}
                        handleChangeEditStatus = {this.handleChangeEditStatus}
                    />
                    <TodosList
                        tasks={currentFilterTasks}//tasks
                        handleClickCheckTask={this.handleClickCheckTask}
                        handleDeleteTask = {this.handleDeleteTask}
                        currentPage = {currentPage}
                        //handleChangeTaskContent = {this.handleChangeTaskContent}
                        handleFocusTaskInput = {this.handleFocusTaskInput}
                        handleChangeEditStatus = {this.handleChangeEditStatus}
                        hanldeTargetChangingTask = {this.hanldeTargetChangingTask}
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
                </ThemeContext.Provider>
            </div>
        )
    }
}

export default App;