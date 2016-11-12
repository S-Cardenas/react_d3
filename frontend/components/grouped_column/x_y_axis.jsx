// unfinished/src/components/x-y-axis.jsx
import React  from 'react';
import Axis   from './axis';
var d3 = require('d3');

export default (props) => {

  var chartHeight = props.style.height - props.style.margin.top - props.style.margin.bottom;

  const xSettings = {
    translate: "translate(0," + chartHeight + ")",
    scale: props.scales.x0Scale,
    orient: 'bottom'
  };

  const ySettings = {
    translate: "translate(0,0)",
    scale: props.scales.yScale,
    orient: 'left'
  };

  return (
    <g className="xy-axis">
      <Axis scale={xSettings}/>
      <Axis scale={ySettings}/>
    </g>
  );
};
