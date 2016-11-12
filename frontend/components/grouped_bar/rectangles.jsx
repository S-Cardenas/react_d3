import React from 'react';

const Rectangles = (props) => {
  const {scales, style, data, currentIndex, parameters} = props;
  const series = parameters.subDomain,
        xData = parameters.range,
        chartWidth = style.width - style.margin.left - style.margin.right,
        barWidth = scales.y1Scale.bandwidth(),
        colors = ["#008080", "#FF0000", "#FFD700", "#800080"];

  var rectangles = series.map((currentValue, i) => {
    let yPos = scales.y1Scale(currentValue),
        xPos = scales.xScale(xData[i][currentIndex]),
        color = colors[i % colors.length];
    return(
      <rect x={0}
            y={yPos}
            width={xPos}
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
