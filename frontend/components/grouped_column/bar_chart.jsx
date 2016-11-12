// import React and D3
import React from 'react';
var d3 = require('d3');

//import Axis and Groups
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

// Find the series range values (Y values)
const findRangeValues = (data) => {
  let seriesTypes = data.seriesTypes,
      idx,
      yValues = [],
      maxY;

  seriesTypes.forEach((type, i) => {
    if (type === "Nominal" || type ==="Ordinal") {
      idx = i;
    }
  });

  yValues = data.data.slice(idx + 1, data.data.length);

  return yValues;
};

//Find the maximum Y value of the input data (Max Range Value)
const findMaxRangeValue = (data) => {
  var yValues = findRangeValues(data).reduce((a,b) => {
    return a.concat(b);
  }, []);

  return Math.max.apply(Math, yValues);
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
  const { data } = props,
        maxY = findMaxRangeValue(data);

  return(
    d3.scaleLinear()
      .range([props.style.height - props.style.margin.top
              - props.style.margin.bottom, 0])
      .domain([0, maxY])
  );
};

export default (props) => {
    const { data, style } = props;
    const scales = {  x0Scale : x0Scale(props),
                      x1Scale : x1Scale(props),
                      yScale: yScale(props) };
    const parameters = { domain: findDomainValues(data),
                         subDomain: findSubDomainValues(data),
                         range: findRangeValues(data)
                        };

    const translate = "translate(" + props.style.margin.left + ","
                      + props.style.margin.right + ")";
    return (
      <svg width={props.style.width} height={props.style.height} >
        <g transform={translate}>
          <Groups scales = {scales}
                  style={style}
                  data={data}
                  parameters={parameters}/>
          <XYAxis scales={scales}
                  style={props.style}/>
        </g>
      </svg>
    );
};
