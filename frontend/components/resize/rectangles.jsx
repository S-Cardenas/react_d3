import React from 'react';

const Rectangles = (props) => {
  const {scales, style, data, currentIndex, parameters, minmiumYValue} = props;
  const series = parameters.subDomain,
        yData = parameters.range,
        chartHeight = style.chart.height,
        barWidth = scales.x1Scale.bandwidth(),
        colors = ["#008080", "#FF0000", "#FFD700", "#800080"];

  var rectangles;
  if (minmiumYValue < 0) {
    rectangles = series.map((currentValue, i) => {
      let xPos = scales.x1Scale(currentValue),
          yPos = (yData[i][currentIndex] < 0) ? scales.yScale(0) : scales.yScale(yData[i][currentIndex]),
          height = (yData[i][currentIndex] < 0) ? Math.abs(scales.yScale(yData[i][currentIndex]) -
                   scales.yScale(0)) : Math.abs(scales.yScale(0) - yPos),
          color = colors[i % colors.length];
      return(
        <rect x={xPos}
              y={yPos}
              width={barWidth}
              height={height}
              key={i}
              fill={color}/>
      );
    });
  } else {
    rectangles = series.map((currentValue, i) => {
      let xPos = scales.x1Scale(currentValue),
          yPos = scales.yScale(yData[i][currentIndex]),
          color = colors[i % colors.length];
      return(
        <rect x={xPos}
              y={yPos}
              width={barWidth}
              height={chartHeight - yPos}
              key={i}
              fill={color}/>
      );
    });
  }
  return(
    <g>{rectangles}</g>
  );


};

export default Rectangles;
