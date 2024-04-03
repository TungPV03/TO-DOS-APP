import React, {useContext, useState,useEffect } from "react";
import '../CSS/Todos_List.css';
import '../CSS/CSS Dark Mode/TodosListDark.css'
import SingleTask from "./SingleTask";
import { DARK_CLASS_NAME, ThemeContext } from "./ThemeProvider";
import { useScrollable } from "./ScrollableComponent";
import { STATUS_FILTER } from "./App";

export default function TodosList (props){
    const [displayTasks, setDisplayTasks] = useState([]);
    const tasksPerPage = 7;
    const {isDarkMode} = useContext(ThemeContext);
    const {tasks,filter} = props;
    
    useEffect(() => {
        setDisplayTasks(tasks.slice(0, tasksPerPage));
    }, [tasks]);

    const loadMoreItem = () => {
        if(displayTasks.length < tasks.length){
            const loadedTasks = [...displayTasks,...tasks.slice(displayTasks.length,displayTasks.length + tasksPerPage)];
            setDisplayTasks(loadedTasks);
        }
    }

    const {setRef, handleScroll} = useScrollable(loadMoreItem);
     
    return displayTasks && displayTasks.length > 0 && (
        <div ref={setRef} 
            className={"to-do-item-container" + (isDarkMode? DARK_CLASS_NAME : '')} 
            onScroll={handleScroll}>
            {displayTasks.map((task, index) =>(
                (filter === STATUS_FILTER.ALL || 
                (filter === STATUS_FILTER.ACTIVE && !task.done) ||
                (filter === STATUS_FILTER.COMPLETED && task.done)) &&
                    <SingleTask
                        done={task.done} 
                        key={task.content + "-" + index}
                        task={task} index={index}
                        {...props}                 
                    />
            ))}
        </div>
    )
}
