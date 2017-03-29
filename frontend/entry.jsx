//React
import React from 'react';
import ReactDOM from 'react-dom';

//Store and Root Component
import configureStore from './store/store';
import ColumnChart from './components/grouped_column/chart';
import BarChart from './components/scatter_plot/chart';
import Resize from './components/resize/chart';

let xData = ["A", "B", "C", "D", "E"],
    yData = [1, 2, 3, 4, 5];

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Resize />, document.getElementById('root'));
});
