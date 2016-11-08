// import React and D3
import React from 'react';
var d3 = require('d3');

// import rectangles from './rectangles';
import Rectangles from './rectangles';
import XYAxis from './x_y_axis';

// Returns a function that "scales" X coordinates from the data to fit the chart

const xScale = (props) => {
  var width = props.style.width,
      dataSetLength = props.data.length,
      barPadding = 1,
      barWidth = width / dataSetLength - barPadding;
  return(
    d3.scaleLinear()
      .domain([0, dataSetLength - 1])
      .range([0, width - barWidth ])
  );
};

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (props) => {
  return (d3.scaleLinear()
    .domain([0, d3.max(props.data)])
    .range([props.style.height - props.style.padding, props.style.padding])
  );
};

// Returns a bar width proportional to amount of data
const barWidth = (props) => {
  var width = props.style.width,
      height = props.style.height,
      barPadding = 1,
      dataSetLength = props.data.length;
  return (
    width / dataSetLength - barPadding
  );
};

export default (props) => {
    const scales = { yScale: yScale(props),
                     xScale: xScale(props),
                     barWidth: barWidth(props),
                     height: props.style.height,
                     padding: props.style.padding};
    console.log(xScale(props)(1));
    return (
      <svg width={props.style.width} height={props.style.height}>
        <Rectangles data={props.data} scales={scales} />
        <XYAxis scales={scales}/>
      </svg>
    );
};
