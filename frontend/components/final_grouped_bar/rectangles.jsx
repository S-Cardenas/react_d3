import React from 'react';

const Rectangles = (props) => {
  const {scales, style, currentIndex, parameters, minmiumYValue} = props;
  const series = parameters.subDomain,
        xData = parameters.range,
        chartWidth = style.chart.width,
        barWidth = scales.y1Scale.bandwidth(),
        colors = ["#008080", "#FF0000", "#FFD700", "#800080"];
  var rectangles = series.map((currentValue, i) => {
    let x = (minmiumYValue < 0) ? scales.xScale(Math.min(0, xData[i][currentIndex])) : 0,
        yPos = scales.y1Scale(currentValue),
        width = Math.abs(scales.xScale(xData[i][currentIndex]) - scales.xScale(0)),
        color = colors[i % colors.length];
    return(
      <rect x={x}
            y={yPos}
            width={width}
            height={barWidth}
            key={i}
            fill={color}/>
    );
  });
  return(
    <g>{rectangles}</g>
  );
};

export default Rectangles;
