import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

axios.defaults.withCredentials = true;
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <Router>
      <App />
    </Router>
);
