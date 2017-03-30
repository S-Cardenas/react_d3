import React from 'react';
import Rectangles from './rectangles';

const Group = (props) => {
  const {scales, style, parameters, minmiumYValue} = props;
  const domain = parameters.domain;
  var groups = domain.map((currentValue, index) => {
    let yPos = scales.y0Scale(currentValue),
        translate = "translate(0," + yPos + ")";

    return(
      <g className="group" key={index} transform={translate}>
        <Rectangles scales={scales}
                    style={style}
                    parameters={parameters}
                    currentIndex={index}
                    minmiumYValue={minmiumYValue}/>
      </g>
    );
  });

  return(
    <g>{groups}</g>
  );
};

export default Group;
