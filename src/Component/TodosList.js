import React, { PureComponent } from "react";
import '../CSS/Todos_List.css';
import '../CSS/CSS Dark Mode/TodosListDark.css'
import SingleTask from "./SingleTask";
import { DARK_CLASS_NAME, ThemeContext } from "./ThemeProvider";

class TodosList extends PureComponent {
    constructor(props){
        super(props);
        this.state = {
            displayTasks : [],
            loadMore: true
        };
        this.tasksPerPage = 7;
        this.tasksContainerRef = React.createRef();
    }

    componentDidUpdate(prevProps){
        if(prevProps.tasks !== this.props.tasks){
            this.setState({displayTasks : this.props.tasks.slice(0,this.tasksPerPage)});
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
    
    
    handleScroll = () => {
        if (this.tasksContainerRef.current.clientHeight + this.tasksContainerRef.current.scrollTop
             >= this.tasksContainerRef.current.scrollHeight) {
            this.loadMoreItem();
        }
    } 
     
    render() {
        const {displayTasks, currentPage} = this.state;
        const {isDarkMode} = this.context;
        return displayTasks.length > 0 && (
            <div ref={this.tasksContainerRef} className={"to-do-item-container" + (isDarkMode? DARK_CLASS_NAME : '')} onScroll={this.handleScroll}>
                <span className="curernt-page">{currentPage}</span>
                {displayTasks.map((task,index) =>(
                        <SingleTask
                            done={task.done} 
                            key={task.content + "-" + index}
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
