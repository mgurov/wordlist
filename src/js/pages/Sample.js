import React from "react";
import WordlistStore from "../stores/WordlistStore";
import _ from "lodash";
import Notes from "../components/verb/Notes.js";
import Debouncer from "../components/Debouncer.js";
import NumericInputForm from "../components/NumericInputForm.js";
import SampleProgress from "../components/sample/SampleProgress.js";

export default React.createClass({
  getInitialState: function() {
    return {
      words: undefined
    };
  },
  
  loadSample: function(sampleSize) {
    
   const captionMapping = {
      'imperfect_singular': 'Imperfectum singular',
      'imperfect_plural': 'Imperfectum plural',
      'perfect': 'Perfectum', 
    };
    
    function isAnswered() {
      const verb = this;
      const anyFalse = _.find(verb.forms, (form) => {
        return form.actual != form.expected; 
      });
      return !anyFalse;
    }

    const words = 
      _.sampleSize(WordlistStore.getAll(), sampleSize)
      .map((w)=>{
        const verb = _.pick(w, 'infinitive', 'notes');
        verb.forms = _.mapValues(w.forms, (form, key)=>{
          return {
            key,
            expected: form,
            actual: '',
            caption: captionMapping[key],
          };
        });
        verb.isAnswered = isAnswered;
        verb.touched = false;
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
      return <NumericInputForm onSubmit={this.onGo} defaultValue="15" caption="Sample size" buttonText="Randomize"/>
    }
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
      this.SetPosition(this.state.position + 1);
    }
  },
  
  SetPosition: function(pos) {
    if (pos < 0 || pos > this.props.words.length - 1) {
      return;
    }
    this.setState({
      position: pos,
      showAnswers: false,
    });    
  },
  
  onHelpClickHandler: function() {
    this.setState({showAnswers: !this.state.showAnswers});
  },
  
  isEof: function() {
    return this.state.position + 1 >= this.props.words.length;
  },
  
  render: function() {
    const verb = this.getCurrentWord();
    verb.touched = true;
    return  <div>
        <SampleProgress sample={this.props.words} current={this.state.position} onStepSelection={this.SetPosition}/>
        <VerbEntryForm key={verb.infinitive} verb={verb} showAnswers={this.state.showAnswers} onKeyDown={this._onKeyDown}>
              <button type="submit" class="btn btn-default" onClick={this.onNextClick}>{this.isEof() ? 'Opnieuw' : 'Next'}</button>
              <button type="submit" class="btn" onClick={this.onHelpClickHandler}>Help!</button>
            </VerbEntryForm>        
        </div>    
  },
  
  _onKeyDown : function(event) {
    const QUESTION_KEY_CODE = 191;
    if (event.keyCode == QUESTION_KEY_CODE) {
      this.onHelpClickHandler();
      event.preventDefault();
    }
  },

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
        verb.forms[key].actual = newValue;
        that.setState({verb});
      }
    }
    
    const inputFields = ['imperfect_singular', 'imperfect_plural', 'perfect'].map((key, index) => {
        const form = verb.forms[key];
        return <FormGroup key={key} id={key} caption={form.caption} autoFocus={index == 0}  
          text={form.expected} showAnswer={showAnswers} placeholder={verb.infinitive}
          value={form.actual} onChange={onChangeHandlerFactory(key)}
          showIsHasSelection={key == 'perfect'}
           />
    });
    
    return (
      <form onKeyDown={this._onKeyDown}>
        <div class="form-group">
          <h3>{verb.infinitive}</h3>
          <p class="help-block"><Notes text={verb.notes}/></p>
        </div>
        {inputFields}
        {this.props.children}
      </form>
    );
  },
  
  _allAnsweredCorrectly: function() {
    const {verb} = this.state;
    return verb.isAnswered();
  },
  
  _onKeyDown : function(event) {
    const ENTER_KEY_CODE = 13;
    if (event.keyCode == ENTER_KEY_CODE && !this._allAnsweredCorrectly()) {
      event.preventDefault();
      return;
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  },

  
});

const FormGroup = React.createClass({
  mixins: [Debouncer(function(){this.reEvaluate()})],
    
  getInitialState: function() {return {evaluationClass: ''}},
  
  evaluateAnswer: function() {
     return (this.props.value == this.props.text) ? 'has-success' : 'has-error';
  },
  
  reEvaluate: function() {
    this.setValidationStatus(this.evaluateAnswer());
  },
  
  withdrawEvaluation: function() {
    this.setValidationStatus('');
  },
  
  setValidationStatus: function(evaluationClass) {
    this.setState({evaluationClass});
  },
  
  componentWillReceiveProps: function(newProps) {
    if (this.props.text != newProps.text || this.props.value != newProps.value) {
      this.withdrawEvaluation();      
      this.debounce();
    }
  },
    
  render: function() {
    const {id, caption, showAnswer, ...rest} = this.props;
    
    var input = <input {...rest} 
                id={id} 
                className="form-control input-lg" 
                type="text"
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect="off"
                onBlur={this.reEvaluate} 
                />
 
    if (this.props.showIsHasSelection) {
      input = <div className="input-group">
              <span class="input-group-addon">
                <button tabIndex="-1" type="button" class="btn btn-default btn-sm active" title="perfectum met hebben">h</button>
                <button tabIndex="-1" type="button" class="btn btn-default btn-sm" title="perfectum met zijn">i</button>
              </span>
              {input}
            </div>
    }
    
    return <div className={"form-group " + this.state.evaluationClass}>
            <label htmlFor={id}>{caption}{showAnswer ? ' -> ' + this.props.text : ''}</label>
            {input}
          </div>
  }
});