// unfinished/src/components/x-y-axis.jsx
import React  from 'react';
import Axis   from './axis';
var d3 = require('d3');

export default (props) => {

  const { scales, style } = props;

  var chartHeight = style.chart.height;

  const xSettings = {
    translate: "translate(0," + chartHeight + ")",
    scale: scales.xScale,
    orient: 'bottom',
    title: scales.rangeAxisTitle
  };

  const ySettings = {
    translate: "translate(0,0)",
    scale: scales.y0Scale,
    orient: 'left',
    title: scales.domainAxisTitle
  };

  return (
    <g className="xy-axis">
      <Axis scale={xSettings} style={style}/>
      <Axis scale={ySettings} style={style}/>
    </g>
  );
};
