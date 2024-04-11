import React from "react";
import '../CSS/MenuFeature.css'
import { useDispatch, useSelector } from "react-redux";
import { STATUS_FILTER } from "./App";

export default function MenuFeature (){
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    debugger;
    const itemLeft = todos.filter(todo => !todo.completed);
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
                        onClick={() => dispatch({type: "filter/filterChanged", payload: STATUS_FILTER.ALL})}
                        defaultChecked
                    />
                    <label htmlFor="select-all">All</label>
                </div>
                <div className="menu-btn">
                    <input
                        id="select-active"
                        type="radio" name="select-type-show"
                        onClick={() => dispatch({type: "filter/filterChanged", payload: STATUS_FILTER.ACTIVE})}
                    />
                    <label htmlFor="select-active">Active</label>
                </div>
                <div className="menu-btn">
                    <input
                        id="select-completed"
                        type="radio"
                        name="select-type-show"
                        onClick={() => dispatch({type: "filter/filterChanged", payload: STATUS_FILTER.COMPLETED})}
                    />
                    <label htmlFor="select-completed">Completed</label>
                    </div>
                </div>
                <div className="menu-item btn-container">
                    <button
                        className="clear-completed-btn"
                        onClick={() => dispatch({type: "todos/todosCompletedCleared"})}
                    >Clear completed
                    </button>
                </div>
            </div>
        )
}
