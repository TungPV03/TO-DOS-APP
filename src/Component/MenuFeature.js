import React from "react";
import '../CSS/MenuFeature.css'

export default function MenuFeature (props){
    const {handleClickSetFilter,
        handleClickClearCompleted,
        tasks} = props;
    const itemLeft = tasks.filter(task => !task.done);
    return itemLeft &&(
        <div className="menu">
            <span className="menu-item item-left">
                {itemLeft.length} items left
            </span>
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
