import React from 'react';

const Circles = (props) => {
  const {scales, style, data, currentIndex, parameters} = props,
        colors = ["#008080", "#FF0000", "#FFD700", "#800080"],
        yValues = data.data[currentIndex + 1],
        xValues = parameters.domain,
        radius = 5 * style.sF;
  
  let color = colors[currentIndex % colors.length];

  let circles = xValues.map( (xValue, i) => {
    let x = scales.x0Scale(xValue),
        y = scales.yScale(yValues[i]);

    return (
      <circle cx={x} cy={y} r={radius} fill={color} key={i}/>
    );
  });

  return (
    <g>
      {circles}
    </g>
  );
};

export default Circles;
