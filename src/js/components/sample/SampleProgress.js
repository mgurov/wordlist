import React from "react";

const Progress = React.createClass({
    
  render: function() {
    const steps = [];
    for (var i = 0; i < this.props.sample.length; i++) {
      const symbol = (i == this.props.current) ? '*' : '.';
      
      steps.push(<span key={i} >{symbol}</span>);
    }
    return <div>{steps}</div>
  }
});

export default Progress;
