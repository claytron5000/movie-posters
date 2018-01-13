import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// import Login from './components/Login';
// import NoMatch from './components/NoMatch';
// import { BrowserRouter, Route, Switch } from 'react-router-dom'



ReactDOM.render(
  <App/>, document.getElementById('root'));
registerServiceWorker();
