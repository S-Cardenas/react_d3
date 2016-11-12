import React from 'react';
import Rectangles from './rectangles';

const Group = (props) => {
  const {scales, style, data} = props;
  var groups = data.data[0].map((currentValue, index) => {
    let xPos = scales.x0Scale(currentValue),
        translate = "translate(" + xPos + ",0)";

    return(
      <g className="group" key={index} transform={translate}>
        <Rectangles
          scales={scales}
          style={style}
          data={data}
          currentIndex={index}/>
      </g>
    );
  });

  return(
    <g>{groups}</g>
  );
};

export default Group;
