import React from 'react';
var d3 = require('d3');

class Axis extends React.Component {

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    var node  = this.refs.axis;
    // console.log(d3.axisBottom(this.props.scale.scale));

    // var axis = d3.svg.axis()
    //                  .orient(this.props.scale.orient)
    if (this.props.scale.orient === 'bottom') {
      var axis = d3.axisBottom(this.props.scale.scale);
    }
    else if(this.props.scale.orient === 'left') {
      var axis = d3.axisLeft(this.props.scale.scale);
    }

    d3.select(node).call(axis);
  }

  render() {
    return (
      <g className="axis" ref="axis" transform={this.props.scale.translate}></g>
    );
  }
}

export default Axis;
