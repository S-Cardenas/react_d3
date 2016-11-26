//React
import React from 'react';
import ReactDOM from 'react-dom';

//Store and Root Component
import configureStore from './store/store';
import ColumnChart from './components/grouped_column/chart';
import BarChart from './components/grouped_bar/chart';

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<BarChart />, document.getElementById('root'));
});
