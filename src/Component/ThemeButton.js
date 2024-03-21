import { PureComponent } from "react";
import "../CSS/ThemeButton.css"
import { ThemeContext } from "./theme-context";

class ThemeButton extends PureComponent{
    constructor(props){
        super(props);
    }

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