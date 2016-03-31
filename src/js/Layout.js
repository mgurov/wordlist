import React from "react";
import WordlistStore from "./stores/WordlistStore";
import Verb from "./components/Verb.js"

export default class Layout extends React.Component {
  render() {
    const { location } = this.props;
    const containerStyle = {
      marginTop: "20px"
    };
    
    const verbs = WordlistStore.getAll().map((w)=><Verb key={w.infinitive} verb={w}/>);
    
    return (
      <div>

        <h1>Hello world!</h1>
        <div class="container" style={containerStyle}>
          {verbs}
        </div>
      </div>

    );
  }
}
