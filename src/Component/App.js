import TaskInput from './TaskInput';
import TodosList from "./TodosList";
import MenuFeature from "./MenuFeature";
import '../CSS/App.css';
import ThemeButton from "./ThemeButton";
import { ThemeContext, DARK_CLASS_NAME } from "./ThemeProvider";
import { useContext, useRef } from 'react';

export const STATUS_FILTER = {
    ACTIVE: "active",
    COMPLETED: "completed",
    ALL: 'all'
}

export default function App () {
    const {isDarkMode} = useContext(ThemeContext);
    const taskInputRef = useRef(null);

    const focusTaskInput = (content, id) => {
        taskInputRef.current.focusTaskInput(content, id);
        taskInputRef.current.setEdittingStatus(true);
    }

    return (
        <div className={"home-page" + (isDarkMode? DARK_CLASS_NAME : "")}>
            <div className={"app-container"}>
                <ThemeButton />
                <h1>TODOS</h1>
                <TaskInput ref={taskInputRef}/>
                <TodosList focusTaskInput = {focusTaskInput}/>
                <MenuFeature/>
            </div>
        </div>
    )
}
