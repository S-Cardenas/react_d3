import React from 'react';

const Rectangles = (props) => {
  const {scales, style, data, currentIndex, parameters} = props;
  const series = parameters.subDomain,
        yData = parameters.range,
        chartHeight = style.height - style.margin.top - style.margin.bottom,
        barWidth = scales.x1Scale.bandwidth(),
        colors = ["#008080", "#FF0000", "#FFD700", "#800080"];

  var rectangles = series.map((currentValue, i) => {
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

  return(
    <g>{rectangles}</g>
  );


};

export default Rectangles;
