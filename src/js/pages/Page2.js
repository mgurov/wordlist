import React from "react";
import WordlistStore from "../stores/WordlistStore";
import _ from "lodash";
import Notes from "../components/verb/Notes.js";
import Debouncer from "../components/Debouncer.js";

export default React.createClass({
  getInitialState: function() {
    return {
      words: undefined
    };
  },
  
  loadSample: function(sampleSize) {
    const wordToStateful = (w) => {
      return {
        expected: w,
        actual: '',
      };
    };
    const words = _.sampleSize(WordlistStore.getAll(), sampleSize)
      .map((w)=>{
        const verb = _.extend({}, w);
        verb.imperfect.singular = wordToStateful(verb.imperfect.singular);
        verb.imperfect.plural = wordToStateful(verb.imperfect.plural);
        verb.perfect = wordToStateful(verb.perfect);
        return verb;
    });
    
    return words;
  },
  
  onGo: function(size) {    
    this.setState({words: this.loadSample(size)})
  },
  
  componentWillReceiveProps: function(newProps) {
    this.setState(this.getInitialState());
  },
  
  render: function() {
    if (this.state.words) {
      return <RandomRow words={this.state.words} onDone={this.componentWillReceiveProps.bind(this)} />
    } else {
      return <SizeInput onGo={this.onGo}/>
    }
  }

});

const SizeInput = React.createClass({
  getInitialState: function() {return {value: 15};},
  setValue: function(newValue) {
    this.setState({value: parseInt(newValue)});
  },
  onGoClick: function() {
    if (this.state.value > 0) {
      this.props.onGo(this.state.value);
    }
  },
  render: function() {
    const valueLink = {
      value: this.state.value,
      requestChange: this.setValue
    };
    return (
      <form class="form-inline">
        <div class="form-group">
          <label for="sampleSize">Sample size</label>
          <input type="number" class="form-control" id="sampleSize" autoFocus valueLink={valueLink}/>
        </div>
        <button onClick={this.onGoClick} type="submit" class="btn btn-default">Randomize</button>
      </form>
    );
  }
});

const RandomRow = React.createClass({
  
  getInitialState: function() {
    return {
      position: 0,
      showAnswers : false,
    };
  },
  
  getCurrentWord: function() {
    return this.props.words[this.state.position];
  },
  
  onNextClick: function() {
    if (this.isEof()) {
      this.props.onDone();
    } else {
      this.setState({
        position: this.state.position + 1,
        showAnswers: false,
      });
    }
  },
  
  onHelpClickHandler: function() {
    this.setState({showAnswers: true});
  },
  
  isEof: function() {
    return this.state.position + 1 >= this.props.words.length;
  },
  
  render: function() {
    const verb = this.getCurrentWord();
    return  <VerbEntryForm key={verb.infinitive} verb={verb} showAnswers={this.state.showAnswers}>
              <button type="submit" class="btn btn-default" onClick={this.onNextClick}>{this.isEof() ? 'Opnieuw' : 'Next'}</button>
              <button type="submit" class="btn" onClick={this.onHelpClickHandler}>Help!</button>
            </VerbEntryForm>
  }
});

const VerbEntryForm = React.createClass({
  render: function() {
    const {verb, showAnswers} = this.props;
    return (
      <form>
        <div class="form-group">
          <h3>{verb.infinitive}</h3>
          <p class="help-block"><Notes text={verb.notes}/></p>
        </div>
        <FormGroup id="impf.s" caption="Imperfectum singular" autoFocus  
          text={verb.imperfect.singular.expected} showAnswer={showAnswers} />
        <FormGroup id="impf.p" caption="Imperfectum plural" 
          text={verb.imperfect.plural.expected} showAnswer={showAnswers} />
        <FormGroup id="impf.s" caption="Perfectum" 
          text={verb.perfect.expected} showAnswer={showAnswers}/>
        {this.props.children}
      </form>
    );
  }
});

const FormGroup = React.createClass({
  mixins: [Debouncer(function(validationClass){this.setValidationStatus(validationClass)})],
    
  getInitialState: function() {return {validationClass:'', value: ''}},
  
  setValidationStatus: function (validationClass) {
    this.setState({validationClass});
  },
  
  onValueChangeHandler: function(e) {
    const value = e.target.value.toLowerCase(); 
    this.setState({value});
    this.setValidationStatus('');
    this.debounce((value == this.props.text) ? 'has-success' : 'has-error')
  },
  
  render: function() {
    const {id, caption, showAnswer, ...rest} = this.props;
    
    return <div className={"form-group " + this.state.validationClass}>
            <label htmlFor={id}>{caption}{showAnswer ? ' -> ' + this.props.text : ''}</label>
            <input {...rest} 
              id={id} 
              className="form-control input-lg" 
              type="text"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off" 
              placeholder={caption} 
              value={this.state.value} 
              onChange={this.onValueChangeHandler}/>
          </div>
  }
});