//React
import React from 'react';
import ReactDOM from 'react-dom';

//Store and Root Component
import configureStore from './store/store';
import Chart from './components/grouped_bar/chart';

document.addEventListener("DOMContentLoaded", function() {
  // const store = configureStore();
  ReactDOM.render(<Chart />, document.getElementById('root'));
});
