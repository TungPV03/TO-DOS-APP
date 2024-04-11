import TaskInput from './TaskInput';
import TodosList from "./TodosList";
import MenuFeature from "./MenuFeature";
import '../CSS/App.css';
import ThemeButton from "./ThemeButton";
import { ThemeContext, DARK_CLASS_NAME } from "./ThemeProvider";
import { useContext, useRef, useState } from 'react';

export const STATUS_FILTER = {
    ACTIVE: "active",
    COMPLETED: "completed",
    ALL: 'all'
}

export default function App () {
    const {isDarkMode} = useContext(ThemeContext);
    const [isEditing, setEditting] = useState(false);
    const taskInputRef = useRef(null);
    const edittingId  = useRef(0);

    const focusTaskInput = (content) => {
        taskInputRef.current.focus();
        taskInputRef.current.value = content;
        setEditting(true);
    }

    const getEdittingTodoId= (id) => {
        edittingId.current = id;
    }

    const clearEdittingStatus = () => {
        setEditting(false);
    }

    return (
        <div className={"home-page" + (isDarkMode? DARK_CLASS_NAME : "")}>
            <div className={"app-container"}>
                <ThemeButton />
                <h1>TODOS</h1>
                <TaskInput
                    ref={taskInputRef}
                    isEditting = {isEditing}
                    edittingId = {edittingId.current}
                    clearEdittingStatus = {clearEdittingStatus}
                />
                <TodosList
                    getEdittingTodoId = {getEdittingTodoId}
                    focusTaskInput = {focusTaskInput}
                />
                <MenuFeature
                />
            </div>
        </div>
    )
}
