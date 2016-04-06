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
    const wordToStateful = (w, caption) => {
      return {
        expected: w,
        actual: '',
        caption: caption,
      };
    };
    const words = _.sampleSize(WordlistStore.getAll(), sampleSize)
      .map((w)=>{
        const verb = _.pick(w, 'infinitive', 'notes');
        verb.imperfect_singular = wordToStateful(w.imperfect.singular, "Imperfectum singular");
        verb.imperfect_plural = wordToStateful(w.imperfect.plural, "Imperfectum plural");
        verb.perfect = wordToStateful(w.perfect, "Perfectum");
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
  
  getInitialState: function() {
    return {
      verb: this.props.verb,
    };
  },

  
  render: function() {
    const {showAnswers} = this.props;
    const {verb} = this.state;
    const that = this;
    function onChangeHandlerFactory (key) {
      return function(e) {
        const newValue = e.target.value.toLowerCase();
        verb[key].actual = newValue;
        that.setState({verb});
      }
    }
    
    const inputFields = ['imperfect_singular', 'imperfect_plural', 'perfect'].map((key, index) => {
        const form = verb[key];
        return <FormGroup id={key} caption={form.caption} autoFocus={index == 0}  
          text={form.expected} showAnswer={showAnswers} 
          value={form.actual} onChange={onChangeHandlerFactory(key)} />
    });
    
    return (
      <form>
        <div class="form-group">
          <h3>{verb.infinitive}</h3>
          <p class="help-block"><Notes text={verb.notes}/></p>
        </div>
        {inputFields}
        {this.props.children}
      </form>
    );
  }
});

const FormGroup = React.createClass({
  mixins: [Debouncer(function(){this.reEvaluate()})],
    
  getInitialState: function() {return {validationClass: this.evaluateAnswer()}},
  
  evaluateAnswer: function() {
     return (this.props.value == this.props.text) ? 'has-success' : 'has-error';
  },
  
  reEvaluate: function() {
    this.setValidationStatus(this.evaluateAnswer());
  },
  
  withdrawEvaluation: function() {
    this.setValidationStatus('');
  },
  
  setValidationStatus: function(validationClass) {
    this.setState({validationClass});
  },
  
  componentWillReceiveProps: function(newProps) {
    if (this.props.text != newProps.text || this.props.value != newProps.value) {
      this.withdrawEvaluation();      
      this.debounce();
    }
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
              />
          </div>
  }
});