import { useContext } from "react";
import "../CSS/ThemeButton.css"
import { ThemeContext } from "./ThemeProvider";

export default function ThemeButton (){
    const {toggleChangeTheme} = useContext(ThemeContext);
    return(
        <div className="theme-btn-container">
            <input type="checkbox" id="check"/>
            <label htmlFor="check" className="theme-btn" onClick={toggleChangeTheme}></label>
        </div>
    )
}