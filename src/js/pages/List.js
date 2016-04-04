import React from "react";
import WordlistStore from "../stores/WordlistStore";
import Verb from "../components/Verb.js"

export default () => (
        <div class="container">
          {WordlistStore.getAll().map((w)=><Verb key={w.infinitive} verb={w}/>)}
        </div>
    );