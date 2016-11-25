import React from 'react';
import ScatterPlot from './scatter_plot';

const style = {
  svgWidth : 1170,
  svgHeight : 730,
  chart : {height: 450, width: 1000},
  margin : {top: 20, right: 20, bottom: 260, left: 150},
  axisMargin : {bottom: 25, left: 25},
  legend: {verticalPadding: 50}
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
      url: 'https://grafiti-api.herokuapp.com/api/v1/datasets/fatal_police_shootings_by_month_012015_072016_hdfsformat',
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
            <h1>Scatter Plot</h1>
            <ScatterPlot style={style} data={this.state.data}/>
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
