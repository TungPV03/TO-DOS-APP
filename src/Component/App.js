import TaskInput from './TaskInput';
import TodosList from "./TodosList";
import MenuFeature from "./MenuFeature";
import '../CSS/App.css';
import ThemeButton from "./ThemeButton";
import { ThemeContext, DARK_CLASS_NAME } from "./ThemeProvider";
import { useContext, useState } from 'react';

export const STATUS_FILTER = {
    ACTIVE: "active",
    COMPLETED: "completed",
    ALL: 'all'
}

export default function App () {
    const [tasks, setTasks] = useState([]);
    const [filter,setFilter] = useState(STATUS_FILTER.ALL);
    const [checkAllDone, setAllDone] = useState(false);
    const {isDarkMode} = useContext(ThemeContext)

    const addNewTask = (newTask) => {
        setTasks(prevState => {
            return [newTask,...prevState];
        });
        setAllDone(false);
    }

    const handleClickCheckAllDone = () => {
        const updatedTasks = tasks.map(task => ({
            ...task,
            done : ! checkAllDone,
        }));
        setTasks(updatedTasks);
        setAllDone(prevAllDone => !prevAllDone);
    }

    const checkStatusTasks = () => {
        setAllDone(tasks.every(task => task.done));
    }

    const handleClickCheckTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].done = !updatedTasks[index].done;
        setTasks(updatedTasks);
        checkStatusTasks();
    }

    const handleClickSetFilter = (filter) => {
        setFilter(filter);
    }

    const handleClickClearCompleted = () => {
        setTasks(tasks.filter(task => !task.done));
    }

    const handleDeleteTask = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index,1);
        setTasks(updatedTasks);
    }

    const handleChangeTaskContent = (index, newContent) => {
        const updatedTasks = tasks;
        updatedTasks[index].content = newContent;
        setTasks(updatedTasks);
    }

    return (
        <div className={"home-page" + (isDarkMode? DARK_CLASS_NAME : "")}>
            <div className={"app-container"}>
                <ThemeButton />
                <h1>TODOS</h1>
                <TaskInput
                    tasks={tasks}
                    addNewTask={addNewTask}
                    handleClickCheckAllDone={handleClickCheckAllDone}
                    checkAllDone={checkAllDone}
                />
                <TodosList
                    filter = {filter}
                    tasks={tasks}
                    handleClickCheckTask={handleClickCheckTask}
                    handleDeleteTask = {handleDeleteTask}
                    handleChangeTaskContent = {handleChangeTaskContent}
                />
                <MenuFeature
                    tasks={tasks}
                    handleClickSetFilter={handleClickSetFilter}
                    handleClickClearCompleted = {handleClickClearCompleted}
                    filter = {filter}
                />
            </div>
        </div>
    )
}
