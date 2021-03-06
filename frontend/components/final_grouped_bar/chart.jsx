// Import Dependencies
import React from 'react';

// Import Component
import BarChart from './bar_chart';

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
        <BarChart innerWidth={this.state.innerWidth}
                  domain={this.props.domain}
                  subDomain={this.props.subDomain}
                  range={this.props.range}
                  domainAxisTitle={this.props.domainAxisTitle}
                  rangeAxisTitle={this.props.rangeAxisTitle}/>
      </div>
    );
  }
}

export default Chart;
