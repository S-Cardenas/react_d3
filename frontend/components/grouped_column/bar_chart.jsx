// import React and D3
import React from 'react';
var d3 = require('d3');

// import rectangles from './rectangles';
// import Rectangles from './rectangles';
import XYAxis from './x_y_axis';
import Groups from './group';

// Finds the Ordinal/Nominal Domain Values
const findDomainValues = (data) => {
  let seriesTypes = data.seriesTypes,
      idx;
  seriesTypes.forEach((type, i) => {
    if (type === "Nominal" || type ==="Ordinal") {
      idx = i;
    }
  });

  return data.data[idx];
};

// Finds the Series Titles For Quantitive Values (SubDomain)
const findSubDomainValues = (data) => {
  let seriesTypes = data.seriesTypes,
      idx;
  seriesTypes.forEach((type, i) => {
    if (type === "Nominal" || type ==="Ordinal") {
      idx = i;
    }
  });

  return data.seriesTitles.slice(idx + 1, data.seriesTitles.length);
};

// Returns a function that scales domain from the data to fit the chart
const x0Scale = (props) => {
  const { data } = props,
        domain = findDomainValues(data);

  return(
    d3.scaleBand()
      .domain(domain)
      .rangeRound([0, props.style.width - props.style.margin.left
                   - props.style.margin.right])
  );
};

// Reutrns a function to scale the subdomain from the data to fit the chart
const x1Scale = (props) => {
  const { data } = props,
        domain = findSubDomainValues(data);
        
  return(
    d3.scaleBand()
      .domain(domain)
      .rangeRound([0,x0Scale(props).bandwidth()])
  );
};

// Returns a function that scales range coordinates
// from the data to fit the chart
const yScale = (props) => {
  var yValues = [];
  for (let i = 1; i < props.data.data.length; i++) {
    yValues = yValues.concat(props.data.data[i]);
  }
  var maxY = Math.max.apply(Math, yValues);
  return(
    d3.scaleLinear()
      .range([props.style.height - props.style.margin.top
              - props.style.margin.bottom, 0])
      .domain([0, maxY])
  );
};

export default (props) => {
    const { data, style } = props;
    const scales = {
      x0Scale : x0Scale(props),
      x1Scale : x1Scale(props),
      yScale: yScale(props)
    };
    const translate = "translate(" + props.style.margin.left + ","
                      + props.style.margin.right + ")";
    return (
      <svg width={props.style.width} height={props.style.height} >
        <g transform={translate}>
          <Groups scales = {scales} style={style} data={data}/>
          <XYAxis scales={scales} style={props.style}/>
        </g>
      </svg>
    );
};
