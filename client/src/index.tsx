import { SERVER_URL } from '@constants/env';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = SERVER_URL;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Router>
    <App />
  </Router>,
);
