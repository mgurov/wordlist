import React from "react";

const style = {
  cursor: 'pointer', 
};

export default React.createClass({

    getInitialState: function() {
      return {shown: false};
    },
    
    onVisibilityToggleClick: function(e) {
      this.setState({shown: !this.state.shown});
    },
    
    render: function() {
        const {text} = this.props;
        
        if (!text) {
          return false;
        }
              
        return <span onClick={this.onVisibilityToggleClick} style={style}>{this.state.shown ? text : '?'}</span>;      
    }
  }
);
