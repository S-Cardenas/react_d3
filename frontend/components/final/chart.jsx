// Import Dependencies
import React from 'react';

// Import Component
import BarChart from './bar_chart';

// Import Sample Data
import SampleData from './data';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.updateSize = this.updateSize.bind(this);
    this.state = {
      innerWidth: window.innerWidth
    };
  }

  componentWillMount() {
    this.setState({data: SampleData});
    window.addEventListener('resize', this.updateSize);
    this.xData = this.props.xData;
    this.yData = this.props.yData;
  }

  updateSize() {
    this.setState({innerWidth: window.innerWidth});
  }

  render() {
    if (this.state.data) {
      return (
          <div className="chart-container">
            <BarChart innerWidth={this.state.innerWidth}
                      xData={this.xData}
                      yData={this.yData}/>
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
