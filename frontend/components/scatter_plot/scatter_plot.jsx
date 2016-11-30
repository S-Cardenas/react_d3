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

  if (data.seriesNames[idx] === 'year') {
    return convertToYear(data.data[idx]);
  }
  else if (data.seriesNames[idx] === 'month') {
    return convertToMonth(data.data[idx]);
  }
  else if(data.seriesNames[idx] === 'date') {
    return convertToDate(data.data[idx]);
  }
  else {
    return data.data[idx];
  }

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

// Find the minimum Y value of the input data (Min Range Value)
const findMinRangeValue = (data) => {
  var yValues = findRangeValues(data).reduce((a,b) => {
    return a.concat(b);
  }, []);

  return Math.min.apply(Math, yValues);
};

// Returns a function that scales domain from the data to fit the chart
const x0Scale = (data, style) => {
  let domainValues = findDomainValues(data);
  return(
    d3.scalePoint()
      .domain(domainValues)
      .rangeRound([0, style.chart.width])
  );
};

// Returns a function to scale range coordinates from the data to fit the chart
const yScale = (data, style) => {
    let maxY = findMaxRangeValue(data),
        minY = findMinRangeValue(data);

  return(
    d3.scaleLinear()
      .range([style.chart.height, 0])
      .domain([minY, maxY])

  );
};

// Convert Epoch to Standard Time (Year)
const convertToYear = (domain) => {
  let newDomain = domain.map( (epoch) => {
    let date = new Date(0);
    date.setUTCSeconds(epoch);
    return date.getFullYear();
  });

  return newDomain;
};

// Convert Epoch to Standard Time (Month)
const convertToMonth = (domain) => {
  let newDomain = domain.map( (epoch) => {
    let date = new Date(0),
        month,
        year;
    date.setUTCSeconds(epoch);
    month = (date.getMonth() + 1).toString();
    year = date.getFullYear().toString();

    return month + "/" + year;
  });

  return newDomain;
};

// Convert Epoch to Standard Time (date)
const convertToDate = (domain) => {
  let newDomain = domain.map( (epoch) => {
    let date = new Date(0),
        month,
        day;
    date.setUTCSeconds(epoch);
    month = (date.getMonth() + 1).toString();
    day = date.getDate().toString();

    return month + "/" + day;
  });

  return newDomain;
};

// Find the Domain Axis Title
const findDomainAxisTitle = (data) => {
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
    const { data, scalingFactor } = props;
    const sF = (scalingFactor) ? scalingFactor : 1;
    const style = {
      svgWidth : 1170 * sF,
      svgHeight : 730 * sF,
      chart : {height: 450 * sF, width: 1000 * sF},
      margin : {top: 20 * sF, right: 20 * sF, bottom: 260 * sF, left: 150 * sF},
      axisMargin : {bottom: 55 * sF, left: 25 * sF},
      legend: {verticalPadding: 50 * sF },
      sF: sF
    };
    const scales = {  x0Scale : x0Scale(data, style),
                      yScale: yScale(data, style),
                      domainAxisTitle: findDomainAxisTitle(data),
                      rangeAxisTitle: findRangeAxisTitle(data)};
    const parameters = { domain: findDomainValues(data),
                         subDomain: findSubDomainValues(data),
                         range: findRangeValues(data)
                        };

    const translate = "translate(" + style.margin.left + ","
                      + style.margin.right + ")";

    const marginBottom = calculateMarginBottom(style, parameters);

    style.svgHeight = style.margin.top + style.chart.height + marginBottom;

    return (
      <svg width={style.svgWidth}
           height={style.svgHeight} >
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
