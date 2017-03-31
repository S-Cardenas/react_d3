// React
import React from 'react';
import ReactDOM from 'react-dom';

// Store and Root Component
import configureStore from './store/store';
import ColumnChart from './components/grouped_column/chart';
import BarChart from './components/scatter_plot/chart';
import LineChart from './components/line_chart/chart';
import Resize from './components/resize/chart';
import FinalGroupedColumn from './components/final_grouped_column/chart';
import FinalGroupedBar from './components/final_grouped_bar/chart';
import FinalLineChart from './components/final_line_chart/chart';

// Grouped Column Data
let x0Data = ["A", "B", "C", "D", "E"],
    x1Data = ["one", "two"],
    yData = [[3,5,4,8,5], [10,9,4.5,7,6]];

// Single Column Data
// let x0Data = ["A", "B", "C", "D", ".5E"],
//     x1Data = ["one"],
//     yData = [[-3,-4,5,6,7]];

// Single Line Chart data
// let x0Data = ["2000", "2010", "2015", "2020", "2025"],
//     x1Data = ["one"],
//     yData = [[3,5,7,6,4]];
document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<LineChart/>, document.getElementById('root'));
});

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(<FinalLineChart domain={x0Data}
                                      subDomain={x1Data}
                                      range={yData}
                                      domainAxisTitle={"letters"}
                                      rangeAxisTitle={"frequency"}/>, document.getElementById('root'));
});
