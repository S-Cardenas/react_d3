import React from 'react';
import Line from './line';

const Group = (props) => {
  const {scales, style, parameters} = props;
  const domain = parameters.domain,
        series = parameters.subDomain;
  var paths = series.map((currentValue, index) => {
    return(
      <g className="group" key={index}>
        <Line scales={scales}
              style={style}
              parameters={parameters}
              currentIndex={index}/>
      </g>
    );
  });

  return(
    <g>{paths}</g>
  );
};

export default Group;
