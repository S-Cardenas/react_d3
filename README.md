# React_D3

Modular charts made with React.JS and the d3.js library. The charts are responsive and will resize themselves automatically as the size of the browser window changes.
Current Available charts are: Bar Chart, Line Chart, Column Chart and Scatter Plot.

## Basic Usage
``` jsx
import React from 'react';
var BarChart = require("react_d3").BarChart;

// Sample Data
let x0Data = ["A", "B", "C", "D", "E"],
    x1Data = ["one", "two"],
    yData = [[3,5,4,8,5], [10,9,4.5,7,6]];

class Example extends React.Component {
  render() {
    return(
      <BarChart domain={x0Data}
                subDomain={x1Data}
                range={yData}
                domainAxisTitle={"letters"}
                rangeAxisTitle={"frequency"}/>
    );
  }
}
```

## Responsive Action
![](https://media.giphy.com/media/WTqdgUy3IihH2/giphy.gif)