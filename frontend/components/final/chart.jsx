// Import Dependencies
import React from 'react';

// Import Component
import BarChart from './bar_chart';

// Import Sample Data
// import SampleData from './data';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.updateSize = this.updateSize.bind(this);
    this.state = {
      innerWidth: window.innerWidth,
      data: true
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
    if (this.state.data) {
      return (
          <div className="chart-container">
            <BarChart data={this.state.data}
                      innerWidth={this.state.innerWidth}
                      domain={this.props.domain}
                      subDomain={this.props.subDomain}
                      range={this.props.range}
                      domainAxisTitle={this.props.domainAxisTitle}
                      rangeAxisTitle={this.props.rangeAxisTitle}/>
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
