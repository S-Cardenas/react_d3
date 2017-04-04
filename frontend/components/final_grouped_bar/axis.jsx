import React from 'react';
var d3 = require('d3');

class Axis extends React.Component {

  componentWillMount() {
    console.log("mounting axis");
    console.log("$", $);
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    // var node  = this.refs.axis;
    var node = $("#" + this.props.scale.orient);

    var node2 = d3.select("#" + this.props.scale.orient).node();
    console.log("node", node);
    console.log("node2", node2);

    if (this.props.scale.orient === 'bottom') {
      var axis = d3.axisBottom(this.props.scale.scale);
    } else if(this.props.scale.orient === 'left') {
      var axis = d3.axisLeft(this.props.scale.scale);
    }

    d3.select(node2).call(axis);
  }

  render() {
    const { scale, style } = this.props;
    let x,
        y,
        rotate,
        title,
        axisLabelFontSize = 20 * style.sF,
        axisTickFontSize = 10 * style.sF,
        axisLabelValueStyle = { fontSize: axisLabelFontSize + "px"},
        axisTickValueStyle = { fontSize: axisTickFontSize + "px"};

    if (this.props.scale.orient === 'bottom') {
      x = (style.svgWidth - style.margin.left - style.margin.right) / 2;
      y = (style.margin.top + style.chart.height + style.axisMargin.bottom);
    } else {
      x = -style.margin.left + style.axisMargin.left;
      y = style.margin.top + (style.chart.height / 2) ;
      rotate = "rotate(-90," + x + "," + y + ")";
    }

    title = (scale.title) ? scale.title : 'Axis Title';


    return (
      <g>
        <g className="axis"
           id={this.props.scale.orient}
           transform={scale.translate}
           style={axisTickValueStyle}>
        </g>
        <text textAnchor={"middle"}
              x={x}
              y={y}
              style={axisLabelValueStyle}
              transform={rotate}>
          {title}
        </text>
      </g>

    );
  }
}

export default Axis;
