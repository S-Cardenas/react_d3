import React from 'react';
import Rectangles from './rectangles';

const Group = (props) => {
  const {scales, style, data, parameters, minmiumYValue} = props;
  const domain = parameters.domain;
  var groups = domain.map((currentValue, index) => {
    let xPos = scales.x0Scale(currentValue),
        translate = "translate(" + xPos + ",0)";

    return(
      <g className="group" key={index} transform={translate}>
        <Rectangles scales={scales}
                    style={style}
                    data={data}
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
