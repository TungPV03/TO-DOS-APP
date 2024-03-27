import React, { PureComponent } from "react";
import '../CSS/MenuFeature.css'
import PageList from "./PageList";

class MenuFeature extends PureComponent{
    render(){
        const {handleClickSetFilter,
                handleClickClearCompleted,
                tasks
                } = this.props;
        const itemLeft = tasks.filter(item => item.done === false).length;
        return tasks.length > 0 &&(
            <div className="menu">
                <span className="menu-item item-left">
                    {itemLeft} items left
                </span>
                {/* <div className="menu-item page-list">
                    <PageList
                        tasks={currentFilterTasks}
                        handleSelectPageNumber={handleSelectPageNumber}
                        currentPage={currentPage}
                    />
                </div> */}
                <div className="menu-item filter-btn-wrapper">
                    <div className="menu-btn">
                        <input 
                            id="select-all" type="radio"
                            name="select-type-show"
                            onClick={() => handleClickSetFilter('all')}
                            defaultChecked
                        />
                        <label htmlFor="select-all">All</label>
                    </div>
                    <div className="menu-btn">
                        <input
                            id="select-active"
                            type="radio" name="select-type-show"
                            onClick={() => handleClickSetFilter('active')}
                        />
                        <label htmlFor="select-active">Active</label>
                    </div>
                    <div className="menu-btn">
                        <input
                            id="select-completed"
                            type="radio"
                            name="select-type-show"
                            onClick={() => handleClickSetFilter('completed')}
                        />
                        <label htmlFor="select-completed">Completed</label>
                    </div>
                </div>
                <div className="menu-item btn-container">
                    <button
                        className="clear-completed-btn"
                        onClick={handleClickClearCompleted}
                    >Clear completed
                    </button>
                </div>
            </div>
        )
    }
}

export default MenuFeature;