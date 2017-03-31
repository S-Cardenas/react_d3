import React from 'react';

const Legend = (props) => {
  const {scales, style, currentIndex, parameters} = props,
        subDomain = parameters.subDomain,
        chartWidth = style.chart.width,
        colors = ["#008080", "#FF0000", "#FFD700", "#800080"],
        textHeight = style.textHeight;

  const legendValues = subDomain.map((value, i) => {
    let x = (chartWidth / 4) * (i % 4),
        y =  style.legend.verticalPadding * Math.floor(i / 4),
        width = (chartWidth / 4) - 30,
        color = colors[i % colors.length],
        valueStyle = { fontSize: textHeight + "px"};
    return (
      <text key={i} x={x} y={y} style={valueStyle} textLength={width} lengthAdjust="spacing">
        {value}
      </text>
    );
  });

  const legendBorders = subDomain.map((value, i) => {
    let x = (chartWidth / 4) * (i % 4),
        y =  style.legend.verticalPadding * Math.floor(i / 4) - style.textHeight,
        width = (chartWidth / 4) - 15,
        padding = 10,
        color = colors[i % colors.length],
        valueStyle = {outline: "thin solid" + color, fontSize: "20px"};

    return (
      <rect x={x - padding}
            y={y}
            width={width}
            height={25 * style.sF}
            key={i}
            stroke={color}
            fill="transparent"
            rx={5}
            ry={5}/>
        );
  });

  const translate = "translate( 0,"
                    + (style.chart.height + style.margin.top
                    + style.axisMargin.bottom * 2) +  ")";

  return (
    <g className={"legend"}transform={translate}>
      {legendValues}
      {legendBorders}
    </g>
  );
};

export default Legend;
