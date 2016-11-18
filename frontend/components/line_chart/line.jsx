import React from 'react';

const Line = (props) => {
  const {scales, style, data, currentIndex, parameters} = props,
        colors = ["#008080", "#FF0000", "#FFD700", "#800080"],
        yValues = data.data[currentIndex + 1],
        xValues = parameters.domain;

  let path = "",
      color = colors[currentIndex % colors.length];


  for (let i = 0; i < xValues.length; i++) {
    let pos = undefined,
        x = scales.x0Scale(xValues[i]),
        y = scales.yScale(yValues[i]);
    if (i === 0) {
      pos = "M" + x + "," + y;
      path += pos;
    }
    else {
      pos = "L" + x + "," + y;
      path += pos;
    }
  }

  return (
    <path d={path}
          fill={'none'}
          stroke={color}
          strokeWidth="3"/>
  );
};

export default Line;
