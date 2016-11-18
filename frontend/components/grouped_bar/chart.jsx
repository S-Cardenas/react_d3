import React from 'react';
import BarChart from './bar_chart';

const style = {
  width   : 1170,
  height  : 730,
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
      url: 'https://grafiti-api.herokuapp.com/api/v1/datasets/event_medals_for_top5population_countries_2012_hdfsform',
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
            <h1>Grouped Bar Chart</h1>
            <BarChart style={style} data={this.state.data}/>
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
