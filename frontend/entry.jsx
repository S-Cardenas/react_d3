// React
import React from 'react';
import ReactDOM from 'react-dom';

// Import Components
import FinalGroupedColumn from './components/final_grouped_column/chart';
import FinalGroupedBar from './components/final_grouped_bar/chart';
import FinalLineChart from './components/final_line_chart/chart';
import FinalScatterPlot from './components/final_scatter_plot/chart';

// Grouped Column Data
let x0Data = ["A", "B", "C", "D", "E"],
    x1Data = ["one", "two"],
    yData = [[3,5,4,8,5], [10,9,4.5,7,6]];

let allCharts = <div>
  <FinalScatterPlot domain={x0Data}
                    subDomain={x1Data}
                    range={yData}
                    domainAxisTitle={"letters"}
                    rangeAxisTitle={"frequency"}/>
  <FinalGroupedColumn domain={x0Data}
                      subDomain={x1Data}
                      range={yData}
                      domainAxisTitle={"letters"}
                      rangeAxisTitle={"frequency"}/>
  <FinalGroupedBar domain={x0Data}
                   subDomain={x1Data}
                   range={yData}
                   domainAxisTitle={"frequency"}
                   rangeAxisTitle={"letters"}/>
  <FinalLineChart domain={x0Data}
                  subDomain={x1Data}
                  range={yData}
                  domainAxisTitle={"letters"}
                  rangeAxisTitle={"frequency"}/>
</div>;


document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(allCharts, document.getElementById('root'));
});
