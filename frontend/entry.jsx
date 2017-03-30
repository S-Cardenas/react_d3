//React
import React from 'react';
import ReactDOM from 'react-dom';

//Store and Root Component
import configureStore from './store/store';
import ColumnChart from './components/grouped_column/chart';
import BarChart from './components/scatter_plot/chart';
import Resize from './components/resize/chart';
import Final from './components/final/chart';

let x0Data = ["A", "B", "C", "D", "E"],
    x1Data = ["one", "two"],
    yData = [[3,4,5,6,7], [10,9,8,7,6]];

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<Final domain={x0Data}
                          subDomain={x1Data}
                          range={yData}
                          domainAxisTitle={"domain axis title"}
                          rangeAxisTitle={"range axis title"}/>, document.getElementById('root'));
});
