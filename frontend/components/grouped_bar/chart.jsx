import React from 'react';
import BarChart from './bar_chart';

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
      url: 'https://grafiti-api.herokuapp.com/api/v1/datasets/how_often_talk_about_economy_hdfsformat',
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
