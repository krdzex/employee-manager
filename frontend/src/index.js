import React from 'react';
import { render } from 'react-dom';
import './index.css';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/pagination/pagination.min.css'

import App from './App';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import allReducers from './Reducers';

const store = createStore(allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
