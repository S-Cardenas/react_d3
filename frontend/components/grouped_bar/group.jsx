import React from 'react';
import Rectangles from './rectangles';

const Group = (props) => {
  const {scales, style, data, parameters} = props;
  const domain = parameters.domain;
  var groups = domain.map((currentValue, index) => {
    let yPos = scales.y0Scale(currentValue),
        translate = "translate(0," + yPos + ")";

    return(
      <g className="group" key={index} transform={translate}>
        <Rectangles
          scales={scales}
          style={style}
          data={data}
          parameters={parameters}
          currentIndex={index}/>
      </g>
    );
  });

  return(
    <g>{groups}</g>
  );
};

export default Group;
