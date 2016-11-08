// unfinished/src/components/x-y-axis.jsx
import React  from 'react';
import Axis   from './axis';
var d3 = require('d3');

const xAxisScale = () => {
  var width = 500,
      dataSetLength = 20,
      barWidth = width / dataSetLength -1;
  return(
    d3.scaleLinear()
      .domain([0, dataSetLength - 1])
      .range([0, width])
  );
};

export default (props) => {

  const xSettings = {
    translate: `translate(12, 50)`,
    scale: props.scales.xScale,
    orient: 'bottom'
  };

  // const ySettings = {
  //   translate: `translate(${props.padding}, 0)`,
  //   scale: props.yScale,
  //   orient: 'left'
  // };

  return (
    <g className="xy-axis">
      <Axis scale={xSettings}/>
    </g>
  );
};
