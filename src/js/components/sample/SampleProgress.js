import React from "react";

const Progress = React.createClass({
    
  render: function() {
    const steps = [];
    for (var i = 0; i < this.props.sample.length; i++) {
      const symbol = (i == this.props.current) ? '*' : '.';
      const that = this;
      const thatI = i;
      const onClick = function() {
        that.props.onStepSelection(thatI);
      }      
      steps.push(<span key={i} onClick={onClick} >{symbol}</span>);
    }
    return <div onClick={this._onClick}>{steps}</div>
  },  
});

export default Progress;
