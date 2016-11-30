import React from 'react';
import BarChart from './bar_chart';


// Scale Factor for Chart
const sF = 1;

// Chart Dimensions
const style = {
  svgWidth : 1170 * sF,
  svgHeight : 730 * sF,
  chart : {height: 450 * sF, width: 1000 * sF},
  margin : {top: 20 * sF, right: 20 * sF, bottom: 260 * sF, left: 150 * sF},
  axisMargin : {bottom: 55 * sF, left: 25 * sF},
  legend: {verticalPadding: 50 * sF},
  sF: sF
};

var data;

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: undefined
    };
  }

  componentDidMount() {
    $.ajax({
      type: 'GET',
      url: 'https://grafiti-api.herokuapp.com/api/v1/datasets/historichomicideratesper100000inhabitants_hdfsformat',
      success: function(response) {
        this.setState({data: response});
      }.bind(this),
      error: function(e) {
        console.log(e);
      }
    });
  }

  render() {
    if (this.state.data) {
      return (
          <div>
            <h1>Grouped Column Chart</h1>
            <BarChart data={this.state.data} scalingFactor={1}/>
          </div>
      );
    }
    else {
      return (
        <div>LOADING......</div>
      );
    }

  }
}

export default Chart;
