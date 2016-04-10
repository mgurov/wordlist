import React from "react";
import _ from "lodash";

const Progress = React.createClass({
    
  render: function() {
    const steps = [];
    for (var i = 0; i < this.props.sample.length; i++) {
      const onClick = _.bind(this.props.onStepSelection, this, i);
      const symbol = (i == this.props.current) ? '*' : '.';      
      steps.push(<span key={i} onClick={onClick} >{symbol}</span>);
    }
    return <div>{steps}</div>
  },  
});

export default Progress;
