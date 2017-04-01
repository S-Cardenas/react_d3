// Import Dependencies
import React from 'react';

// Import Components
import LineChart from './line_chart';

// Define Component
export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.updateSize = this.updateSize.bind(this);
    this.state = {
      innerWidth: window.innerWidth
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateSize);
  }

  updateSize() {
    this.setState({innerWidth: window.innerWidth});
  }

  render() {
      return (
        <LineChart innerWidth={this.state.innerWidth}
                   domain={this.props.domain}
                   subDomain={this.props.subDomain}
                   range={this.props.range}
                   domainAxisTitle={this.props.domainAxisTitle}
                   rangeAxisTitle={this.props.rangeAxisTitle}/>
      );
  }
}

// export default Chart;
