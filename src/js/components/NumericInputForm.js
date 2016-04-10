import React from "react";

export default React.createClass({
  getInitialState: function() {return {value: this.props.defaultValue};},
  setValue: function(newValue) {
    this.setState({value: parseInt(newValue)});
  },
  onSubmit: function() {
    if (this.state.value > 0) {
      this.props.onSubmit(this.state.value);
    }
  },
  render: function() {
    const valueLink = {
      value: this.state.value,
      requestChange: this.setValue
    };
    
    return (
      <form class="form-inline" onSubmit={this.onSubmit}>
        <div class="form-group">
          <label for="sampleSize">{this.props.caption}</label>
          <input type="number" class="form-control" id="sampleSize" autoFocus valueLink={valueLink}/>
        </div>
        { this.props.buttonText ? <button type="submit" class="btn btn-default">{this.props.buttonText}</button> : null }
      </form>
    );
  }
});
