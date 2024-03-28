import React, { PureComponent } from "react";
import '../CSS/Todos_List.css';
import '../CSS/CSS Dark Mode/TodosListDark.css'
import SingleTask from "./SingleTask";
import { DARK_CLASS_NAME, ThemeContext } from "./ThemeProvider";
import ehanceScrollComponent from "./ScrollableComponent";

class TodosList extends PureComponent {
    constructor(props){
        super(props);
        this.state = {displayTasks : []};
        this.tasksPerPage = 7;
    }
    
    componentDidUpdate(prevProps){
        const {tasks} = this.props;
        if(prevProps.tasks !== tasks){
            this.setState({displayTasks : tasks.slice(0,this.tasksPerPage)});
        }
    }

    loadMoreItem = () => {
        const {tasks} = this.props;
        const {displayTasks} = this.state;
        if(displayTasks.length < tasks.length){
            const loadedTasks = [...displayTasks,...tasks.slice(displayTasks.length,displayTasks.length + this.tasksPerPage)];
            this.setState({displayTasks : loadedTasks});
        }
    }
     
    render() {
        const {displayTasks} = this.state;
        const {isDarkMode} = this.context;
        return displayTasks.length > 0 && (
            <div ref={this.props.setRef} 
                className={"to-do-item-container" + (isDarkMode? DARK_CLASS_NAME : '')} 
                onScroll={this.props.handleScroll}>
                {displayTasks.map((task) =>(
                        <SingleTask
                            done={task.done} 
                            key={task.content + "-" + task.oldIndex}
                            task={task} index={task.oldIndex}
                            {...this.props}                 
                        />
                ))}
            </div>
        )
    }
}

TodosList.contextType = ThemeContext;
const ScrollableComponent = ehanceScrollComponent(TodosList);
export default ScrollableComponent;
