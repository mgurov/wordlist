import React from "react";

export default React.createClass({
  
  //size={this.props.words.length} current={this.state.position}
  
  render: function() {
    const steps = [];
    for (var i = 0; i < this.props.size; i++) {
      const symbol = (i == this.props.current) ? '*' : '.';
      
      steps.push(<span key={i} >{symbol}</span>);
    }
    return <div>{steps}</div>
  }
});