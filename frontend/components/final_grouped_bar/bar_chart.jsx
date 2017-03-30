// Import React and D3
import React from 'react';
var d3 = require('d3');

// Import Axis and Groups
import Legend from './legend';
import XYAxis from './x_y_axis';
import Groups from './group';

// The minimum value of the data in the range
var minmiumYValue = undefined;

// Find the maximum Y value of the input data (Max Range Value)
const findMaxRangeValue = (range) => {
  let yValues = range.reduce((a,b) => {
    return a.concat(b);
  }, []);
  let max = Math.max.apply(Math, yValues);
  if (max <= 0) {
    return 0;
  } else {
    return max;
  }
};

// Find the minimum Y value of the input data (Min Range Value)
const findMinRangeValue = (range) => {
  let yValues = range.reduce((a,b) => {
    return a.concat(b);
  }, []);
  let min = Math.min.apply(Math,yValues);
  if (min >= 0) {
    return 0;
  } else {
    return min;
  }
};

// Returns a function to scale the range from the data to fit the chart
const xScale = (range, style) => {
    const maxY = findMaxRangeValue(range);
    const minY = findMinRangeValue(range);
    minmiumYValue = minY; // to be passed down as props later
    return(
      d3.scaleLinear()
        .range([0, style.chart.width])
        .domain([minY, maxY])
    );
};

// Returns a function to scale the subdomain from the data to fit the chart
const y1Scale = (subDomain, domain,  style) => {
  return(
    d3.scaleBand()
      .domain(subDomain)
      .rangeRound([0,y0Scale(domain, style).bandwidth()])
  );
};

// Reutrns a function to scale the domain from the data to fit the chart
const y0Scale = (domain, style) => {
  return(
    d3.scaleBand()
      .domain(domain)
      .range([style.chart.height, 0])

  );
  // .rangeRound causes aesthetic errors if the width of the domain is not a multiple of
  // the cardinality of the range, there may be leftover unused space, even without padding!
  // Use band.align to specify how the leftover space is distributed
  // https://github.com/d3/d3-scale/blob/master/README.md#band_round
  //////////////
  // return(
  //   d3.scaleBand()
  //     .domain(domain)
  //     .rangeRound([style.chart.height, 0])
  //
  // );
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
    const { backgroundColor, innerWidth, domain, subDomain, range, domainAxisTitle, rangeAxisTitle } = props;
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
    const scales = {
      xScale : xScale(range, style),
      y0Scale : y0Scale(domain, style),
      y1Scale: y1Scale(subDomain, domain, style),
      domainAxisTitle: domainAxisTitle,
      rangeAxisTitle: rangeAxisTitle};
    const parameters = {
      domain: domain,
      subDomain: subDomain,
      range: range
    };
    const newSVGHeight = findSVGHeight(style, parameters);
    const translate = "translate(" + style.margin.left + ","
                      + style.margin.top + ")";
    const marginBottom = calculateMarginBottom(style, parameters);
    style.svgHeight = style.margin.top + style.chart.height + marginBottom;
    return (
      <svg width={containerWidth}
           height={newSVGHeight}
           style={{backgroundColor: backgroundColor}}>
        <g transform={translate}>
          <Groups scales = {scales}
                  style={style}
                  parameters={parameters}
                  minmiumYValue={minmiumYValue}/>
          <XYAxis scales={scales}
                  style={style}/>
          <Legend scales = {scales}
                  style={style}
                  parameters={parameters}/>
        </g>
      </svg>
    );
};
