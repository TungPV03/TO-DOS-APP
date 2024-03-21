import React from "react"

export const THEME = {
    dark : {
        backgroundColor : "#111130",
        color : "#fafafa",
    },
    light : {
        backgroundColor : "#ffffff",
        color : "#212121"
    }
}

export const DARK_CLASS_NAME = ' dark';

export const ThemeContext = React.createContext({
    theme : THEME.light,
    isDarkMode : false,
    toggleChangeTheme : () => {}
});