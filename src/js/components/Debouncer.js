import _ from "lodash";

export default function(callback) { return {
  
    componentWillMount: function() {
      
      const delay = 500;
      
      const debounced = _.debounce(callback, delay);
      
      this.debounce =  function() {
          debounced.apply(this, arguments);
      };
      
      this.debounce.cancel = debounced.cancel; 
    },
    
    componentWillUnmount: function() {
      this.debounce.cancel();
    },
  }
};
