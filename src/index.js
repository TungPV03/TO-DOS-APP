import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./Component/App";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'
import ThemeProvider from "./Component/ThemeProvider";
import { Provider } from "react-redux";
import store from './Redux/store';
import api from "./API";

store.dispatch(api.fetchTodos());

const root = ReactDOM.createRoot(document.getElementById('root'));
const app = (<ThemeProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </ThemeProvider>);
root.render(app);
