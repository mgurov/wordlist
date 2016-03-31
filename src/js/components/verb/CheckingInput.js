import React from "react";
import _ from "lodash";

export default React.createClass({
  
  getInitialState: function() {return {enteredText: undefined}},
  
  componentWillMount: function() {
    
    const that = this;
    
    const delay = 500;

    function resetStatus() {
      if (!!that.state.enteredText) {
        that.setState({enteredText: undefined});
      }
    }

    function evaluateStatus(enteredText) {
      that.setState({enteredText});
    }
    
    const debounced = _.debounce(evaluateStatus, delay);
    this.onTextChangeHandler =  function(e) {
        resetStatus();
        debounced(e.target.value);
    };
    
    this.componentWillUnmount = debounced.cancel; 
  },
  
  render: function() {
      const {text, caption} = this.props;
      
      if (!text) {
        return false;
      }
      
      const style = {};
      
      if (this.state.enteredText) {
        if (this.state.enteredText == this.props.text) {
          style.color = 'green';
        } else {
          style.color = 'red';
        }
      }
            
      return <input type={text} placeholder={caption} style={style} onChange={this.onTextChangeHandler}/>
  }
});
