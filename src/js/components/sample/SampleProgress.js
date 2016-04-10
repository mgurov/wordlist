import React from "react";
import _ from "lodash";

const Progress = React.createClass({
    
  render: function() {
    
    
    const {sample, current} = this.props;
    const steps = [];
    const stepsPercentage = 100 / sample.length;
    for (var i = 0; i < sample.length; i++) {
      const thisVerb = sample[i];
      var statusClass;            
      if (i == current) {
        statusClass = 'warning progress-bar-striped active';
      } else if (thisVerb.isAnswered()) {
        statusClass = 'success';
      } else if (thisVerb.touched) {
        statusClass = 'danger';
      } else {
        statusClass = 'warning';
      }
      
      const onClick = _.bind(this.props.onStepSelection, this, i);
      steps.push(
            <div key={i} className={"progress-bar progress-bar-" + statusClass} style={{width: stepsPercentage + '%'}}
               onClick={onClick}
               title={thisVerb.infinitive}
             >
              <span class="sr-only">{stepsPercentage}% Complete ({statusClass})</span>
            </div>
      )
    }
    return <div class="progress">{steps}</div>
  },  
});

export default Progress;
