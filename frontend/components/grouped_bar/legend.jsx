import React from 'react';

const Legend = (props) => {
  const {scales, style, data, currentIndex, parameters} = props,
        subDomain = parameters.subDomain,
        chartWidth = style.width - style.margin.left - style.margin.right,
        colors = ["#008080", "#FF0000", "#FFD700", "#800080"],
        legendValueVerticalPadding = 50;

  const legendValues = subDomain.map((value, i) => {
    let x = (chartWidth / 4) * (i % 3),
        y =  legendValueVerticalPadding * Math.floor(i / 3),
        color = colors[i % colors.length],
        valueStyle = { fontSize: "20px"};
    return (
      <text key={i} x={x} y={y} style={valueStyle} textLength={100}>
        {value}
      </text>
    );
  });

  const legendBorders = subDomain.map((value, i) => {
    let x = (chartWidth / 4) * (i % 3),
        y =  legendValueVerticalPadding * Math.floor(i / 3) - 20,
        width = (chartWidth / 4) - 15,
        padding = 10,
        color = colors[i % colors.length],
        valueStyle = {outline: "thin solid" + color, fontSize: "20px"};

    return (
      <rect x={x - padding}
            y={y}
            width={width}
            height={25}
            key={i}
            stroke={color}
            fill="transparent"
            rx={5}
            ry={5}/>
        );
  });

  let translate = "translate( 0,"
                    + (style.height - style.margin.top
                      - style.margin.bottom + style.axisMargin.bottom * 3) +  ")";

  return (
    <g transform={translate}>
      {legendValues}
      {legendBorders}
    </g>
  );
};

export default Legend;
