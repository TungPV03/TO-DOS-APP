import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./Component/App";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'
import ThemeProvider from "./Component/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById('root'));
const app = (<ThemeProvider>
                <App />
            </ThemeProvider>);
root.render(app);
