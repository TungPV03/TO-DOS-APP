import { PureComponent } from "react";
import "../CSS/ThemeButton.css"
import { ThemeContext } from "./ThemeProvider";

class ThemeButton extends PureComponent{

    render(){
        return(
            <ThemeContext.Consumer>
                {({toggleChangeTheme}) => (
                    <div className="theme-btn-container">
                        <input type="checkbox" id="check"/>
                        <label htmlFor="check" className="theme-btn" onClick={toggleChangeTheme}></label>
                    </div>
                )}
            </ThemeContext.Consumer>
        )
    }
}

export default ThemeButton;