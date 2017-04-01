import React from 'react';
import Circles from './circles';

const Group = (props) => {
  const {scales, style, parameters} = props;
  const domain = parameters.domain,
        series = parameters.subDomain;
  var circles = series.map((currentValue, index) => {

    return(
      <g className="group" key={index}>
        <Circles scales={scales}
              style={style}
              parameters={parameters}
              currentIndex={index}/>
      </g>
    );
  });

  return(
    <g>{circles}</g>
  );
};

export default Group;
