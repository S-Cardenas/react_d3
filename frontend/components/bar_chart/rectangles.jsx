import React from 'react';

export default (props) => {
  var xSpacing = 'something';
  var rectangles = props.data.map((currentValue, index) => {
    var xPos = props.scales.xScale(index),
        yPos = props.scales.yScale(currentValue),
        chartHeight = props.scales.height,
        barWidth = props.scales.barWidth;
    return(
      <rect x={xPos} y={chartHeight - yPos} width={barWidth} height={yPos} key={index}/>
    );
  });
  return(
    <g>{rectangles}</g>
  );
};
