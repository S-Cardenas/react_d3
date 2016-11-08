// import React and D3
import React from 'react';
var d3 = require('d3');

// import rectangles from './rectangles';
// import Rectangles from './rectangles';
import XYAxis from './x_y_axis';

// Returns a function that "scales" X coordinates from the data to fit the chart

const x0Scale = (props) => {

  var domain = props.data.data[0];
  return(
    d3.scaleBand()
      .domain(domain)
      .rangeRound([0, props.style.width - props.style.margin.left - props.style.margin.right])

  );
};

const x1Scale = (props) => {
  return(
    d3.scaleBand()
      .domain(props.data.seriesNames)
      .rangeRound([0,x0Scale(props).bandwidth()])
  );
};

// Returns a function that "scales" Y coordinates from the data to fit the chart
const yScale = (props) => {
  var yValues = [];
  for (let i = 1; i < props.data.data.length; i++) {
    yValues = yValues.concat(props.data.data[i]);
  }
  var maxY = Math.max.apply(Math, yValues);
  return(
    d3.scaleLinear()
      .range([props.style.height - props.style.margin.top - props.style.margin.bottom, 0])
      .domain([0, maxY])
  );
};

// Returns a bar width proportional to amount of data
const barWidth = (props) => {

};

export default (props) => {
    const { data, style } = props;
    const scales = {
      x0Scale : x0Scale(props),
      x1Scale : x1Scale(props),
      yScale: yScale(props)
    };
    const translate = "translate(" + props.style.margin.left + "," + props.style.margin.right + ")";
    return (
      <svg width={props.style.width} height={props.style.height} >
        <g transform={translate}>
          <XYAxis scales={scales} style={props.style}/>
        </g>
      </svg>
    );
};
