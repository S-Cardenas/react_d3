import React from 'react';
import BarChart from './bar_chart';

var data;

// Import Sample Data
import SampleData from './data';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.updateSize = this.updateSize.bind(this);
    this.state = {
      data: undefined,
      innerWidth: window.innerWidth
    };
  }

  componentWillMount() {
    this.setState({data: SampleData});
    window.addEventListener('resize', this.updateSize);
  }

  updateSize() {
    this.setState({innerWidth: window.innerWidth});
  }

  componentDidMount() {
    // $.ajax({
    //   type: 'GET',
    //   url: 'api/v1/datasets/historichomicideratesper100000inhabitants_hdfsformat',
    //   success: function(response) {
    //     this.setState({data: response});
    //   }.bind(this),
    //   error: function(e) {
    //     console.log(e);
    //   }
    // });
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
