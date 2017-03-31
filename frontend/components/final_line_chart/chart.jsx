// Import Dependencies
import React from 'react';

// Import Components
import LineChart from './line_chart';

// Define Component
class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.updateSize = this.updateSize.bind(this);
    this.state = {
      innerWidth: window.innerWidth
    };
  }

  componentWillMount() {
    // this.setState({data: SampleData});
    window.addEventListener('resize', this.updateSize);
  }

  updateSize() {
    this.setState({innerWidth: window.innerWidth});
  }

  render() {
      return (
          <div className="chart-container">
            <LineChart data={this.state.data}/>
          </div>
      );
  }
}

export default Chart;
