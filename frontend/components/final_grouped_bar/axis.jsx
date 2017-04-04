import React from 'react';
var d3 = require('d3');

class Axis extends React.Component {
  constructor(props) {
    super(props);
    this.id = null;
    this.genRandomInt = this.genRandomInt.bind(this);
    this.getRandomLetter = this.getRandomLetter.bind(this);
  }

  componentWillMount() {
    this.id = this.getRandomLetter() + this.genRandomInt(0, 10000).toString();
  }

  genRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  getRandomLetter() {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    var node = d3.select("#" + this.id).node();
    if (this.props.scale.orient === 'bottom') {
      var axis = d3.axisBottom(this.props.scale.scale);
    } else if(this.props.scale.orient === 'left') {
      var axis = d3.axisLeft(this.props.scale.scale);
    }
    d3.select(node).call(axis);
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
           id={this.id}
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
