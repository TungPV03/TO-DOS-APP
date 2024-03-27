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
    isDarkMode : false,
    toggleChangeTheme : () => {}
});

class ThemeProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDarkMode: false,
            toggleChangeTheme : this.toggleChangeTheme,
        };
    }

    toggleChangeTheme = () => {
        this.setState(prevState => ({
            isDarkMode: !prevState.isDarkMode
        }))
    }
    render() {
        const {children} = this.props;
        const {isDarkMode} = this.state;
        return (
            <ThemeContext.Provider value={{isDarkMode, toggleChangeTheme: this.toggleChangeTheme}}>
                {children}
            </ThemeContext.Provider>
        )
    }
}

export default ThemeProvider;