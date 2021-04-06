import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/main.scss';
import { App } from './App.jsx';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import UserReducer from './store/reducers/UserReducer';
// import filterReducer from './cmps/FilterMovie';
import moviesReducer from "./store/reducers/MoviesReducer";

const rootReducer = combineReducers({
  userModule: UserReducer,
  // filterModule: filterReducer
  moviesModule: moviesReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);
