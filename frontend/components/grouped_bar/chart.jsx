import React from 'react';
import BarChart from './bar_chart';

const style = {
  width   : 1020,
  height  : 530,
  margin : {top: 20, right: 20, bottom: 60, left: 100},
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
      url: 'https://grafiti-api.herokuapp.com/api/v1/datasets/total_medals_for_eight_countries_2012_hdfsform',
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
