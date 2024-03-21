import React from "react";
import ReactDOM from 'react-dom/client';
import App from "./Component/App";
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
const app = <App />;
root.render(app);
