import React from "react";
import _ from "lodash";

const Progress = React.createClass({
    
  render: function() {
    
    
    const {sample, current} = this.props;
    const steps = [];
    for (var i = 0; i < sample.length; i++) {
      var symbol;
      var color = undefined;            
      if (i == current) {
        symbol = '*';
      } else if (sample[i].isAnswered()) {
        symbol = '.';
        color = 'green';
      } else {
        symbol = '.';
      }
      
      const onClick = _.bind(this.props.onStepSelection, this, i);
      steps.push(<span key={i} onClick={onClick} style={{color}} >{symbol}</span>);
    }
    return <div>{steps}</div>
  },  
});

export default Progress;
