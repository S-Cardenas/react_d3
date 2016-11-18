// import React and D3
import React from 'react';
var d3 = require('d3');

//import Axis and Groups
import Legend from './legend';
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

// Returns a function to scale the range from the data to fit the chart
const xScale = (props) => {
    const { data, style } = props,
          maxY = findMaxRangeValue(data);

    return(
      d3.scaleLinear()
        .range([0, style.chart.width])
        .domain([0, maxY])
    );
};

// Returnsns a function to scale the subdomain from the data to fit the chart
const y1Scale = (props) => {
  const { data, style } = props,
        domain = findSubDomainValues(data);

  return(
    d3.scaleBand()
      .domain(domain)
      .rangeRound([0,y0Scale(props).bandwidth()])
  );
};

// Reutrns a function to scale the domain from the data to fit the chart
const y0Scale = (props) => {
  const { data, style } = props,
        domain = findDomainValues(data);

  return(
    d3.scaleBand()
      .domain(domain)
      .rangeRound([style.chart.height, 0])
  );
};

// Find the Domain Axis Title
const findDomainAxisTitle = (data) => {
  // let seriesTypes = data.seriesTypes,
  //     idx;
  // seriesTypes.forEach((type, i) => {
  //   if (type === "Nominal" || type ==="Ordinal") {
  //     idx = i;
  //   }
  // });
  //
  // return data.seriesTitles[idx];
  return data.xAxisTitle;
};

//Find the Range Axis Title
const findRangeAxisTitle = (data) => {
  return data.yAxisTitle;
};

//Calculates the required bottom margin of chart to fit entire Legend
const calculateMarginBottom = (style, parameters) => {
  return style.axisMargin.bottom +
        (style.legend.verticalPadding) *
        (Math.floor(parameters.subDomain.length / 3) + 2 );
};

export default (props) => {
    const { data, style } = props;

    const scales = {  xScale : xScale(props),
                      y0Scale : y0Scale(props),
                      y1Scale: y1Scale(props),
                      domainAxisTitle: findDomainAxisTitle(data),
                      rangeAxisTitle: findRangeAxisTitle(data)};
    const parameters = { domain: findDomainValues(data),
                         subDomain: findSubDomainValues(data),
                         range: findRangeValues(data)
                        };
    const translate = "translate(" + style.margin.left + ","
                      + style.margin.top + ")";

    const marginBottom = calculateMarginBottom(style, parameters);

    style.height = style.margin.top + style.chart.height + marginBottom;

    return (
      <svg width={style.width}
           height={style.height}>
        <g transform={translate}>
          <Groups scales = {scales}
                  style={style}
                  data={data}
                  parameters={parameters}/>
          <XYAxis scales={scales}
                  style={style}/>
          <Legend scales = {scales}
                  style={style}
                  data={data}
                  parameters={parameters}/>
        </g>
      </svg>
    );
};
