import React, { useState } from "react"

export const DARK_CLASS_NAME = ' dark';

export const ThemeContext = React.createContext({
    isDarkMode : false,
    toggleChangeTheme : () => {}
});

function ThemeProvider (props){
    const [isDarkMode, setDarkMode] = useState(false);

   const toggleChangeTheme = () => {
        setDarkMode(prevDarkMode => !prevDarkMode);
    }

    return (
        <ThemeContext.Provider value={{isDarkMode,toggleChangeTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;