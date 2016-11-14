// unfinished/src/components/x-y-axis.jsx
import React  from 'react';
import Axis   from './axis';
var d3 = require('d3');

export default (props) => {

  const { scales, style } = props;

  var chartHeight = style.height - style.margin.top
                    - style.margin.bottom;

  const xSettings = {
    translate: "translate(0," + chartHeight + ")",
    scale: props.scales.xScale,
    orient: 'bottom',
    title: undefined
  };

  const ySettings = {
    translate: "translate(0,0)",
    scale: props.scales.y0Scale,
    orient: 'left',
    title: props.scales.domainAxisTitle
  };

  return (
    <g className="xy-axis">
      <Axis scale={xSettings} style={style}/>
      <Axis scale={ySettings} style={style}/>
    </g>
  );
};
