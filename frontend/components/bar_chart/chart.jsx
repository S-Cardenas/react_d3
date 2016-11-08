import React from 'react';
import BarChart from './bar_chart';

const style = {
  width   : 500,
  height  : 300,
  padding : 30,
};

const dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: dataset};
  }

  render() {
    return (
        <div>
          <h1>Playing with React and D3</h1>
          <BarChart style={style} data={this.state.data}/>
        </div>
    );
  }
}

export default Chart;
