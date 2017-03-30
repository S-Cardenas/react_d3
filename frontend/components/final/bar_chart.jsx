// import React and D3
import React from 'react';
var d3 = require('d3');

//import Axis and Groups
import Legend from './legend';
import XYAxis from './x_y_axis';
import Groups from './group';

// The minimum value of the data in the range
var minmiumYValue = undefined;

// Finds the Ordinal/Nominal Domain Values
const findDomainValues = (data) => {
  let seriesTypes = data.seriesTypes,
      idx;
  seriesTypes.forEach((type, i) => {
    if (type === "Nominal" || type ==="Ordinal") {
      idx = i;
    }
  });

  if (data.seriesNames[idx] === 'year' || data.xAxisTitle === 'Year') {
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
const findMaxRangeValue = (range) => {
  var yValues = range.reduce((a,b) => {
    return a.concat(b);
  }, []);

  return Math.max.apply(Math, yValues);
};

// Find the minimum Y value of the input data (Min Range Value)
const findMinRangeValue = (range) => {
  var yValues = range.reduce((a,b) => {
    return a.concat(b);
  }, []);

  return Math.min.apply(Math,yValues);
};

// Returns a function that scales domain from the data to fit the chart
const x0Scale = (domain, style) => {
  // const domain = findDomainValues(data);
  return(
    d3.scaleBand()
      .domain(domain)
      .rangeRound([0, style.chart.width])
  );
};

// Reutrns a function to scale the subdomain from the data to fit the chart
const x1Scale = (subDomain, domain, style) => {
  // const domain = findSubDomainValues(data);

  return(
    d3.scaleBand()
      .domain(subDomain)
      .rangeRound([0,x0Scale(domain, style).bandwidth()])
  );
};

// Returns a function to scale range coordinates from the data to fit the chart
const yScale = (range, style) => {
  const maxY = findMaxRangeValue(range);
  const minY = findMinRangeValue(range);
  minmiumYValue = minY; // to be passed down as props later
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

//Find the SVGHeight based on the datasize and styles
const findSVGHeight = (style, parameters) => {
  let newSVGHeight = style.margin.top + style.chart.height +
                       (2 * style.axisMargin.bottom) +
                       (style.legend.verticalPadding *
                       (Math.floor(parameters.subDomain.length / 4) + 1) -
                       style.textHeight);
  return newSVGHeight;
};

export default (props) => {
    const $container = $('.chart-container');
    // const containerWidth = $container.width();
    // const containerHeight = $container.height();

    const { data, backgroundColor, innerWidth, domain, subDomain, range, domainAxisTitle, rangeAxisTitle } = props;
    const containerWidth = innerWidth;
    const containerHeight = innerWidth;
    const sF = containerWidth / 1170;
    const style = {
      svgWidth : 1170 * sF,
      svgHeight : 730 * sF,
      chart : {height: 450 * sF, width: 1000 * sF},
      margin : {top: 20 * sF, right: 20 * sF, bottom: 260 * sF, left: 150 * sF},
      axisMargin : {bottom: 55 * sF, left: 25 * sF},
      legend: {verticalPadding: 50 * sF },
      sF: sF,
      textHeight: 20 * sF
    };
    const scales = {  x0Scale : x0Scale(domain, style),
                      x1Scale : x1Scale(subDomain, domain, style),
                      yScale: yScale(range, style),
                      domainAxisTitle: domainAxisTitle,
                      rangeAxisTitle: rangeAxisTitle};
    const parameters = { domain: domain,
                         subDomain: subDomain,
                         range: range
                        };

    const newSVGHeight = findSVGHeight(style, parameters);
    const translate = "translate(" + style.margin.left + ","
                      + style.margin.right + ")";

    const marginBottom = calculateMarginBottom(style, parameters);
    style.svgHeight = style.margin.top + style.chart.height + marginBottom;

    return (
      <svg width={containerWidth}
           height={newSVGHeight}
           style={{backgroundColor: "white"}}>
        <g transform={translate}>
          <Groups scales = {scales}
                  style={style}
                  data={data}
                  parameters={parameters}
                  minmiumYValue={minmiumYValue}/>
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
