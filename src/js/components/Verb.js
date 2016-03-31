import React from "react";
import Notes from "./verb/Notes.js";
import CheckingInput from "./verb/CheckingInput.js";

export default function({verb}) {
    return (
      <div class="row">
        <div class="col-xs-2">
          {verb.infinitive}
        </div>
        <div class="col-xs-3">
          <CheckingInput text={verb.imperfect.singular} caption="Imperf.sngl." />
        </div>
        <div class="col-xs-3">
          <CheckingInput text={verb.imperfect.plural} caption="Imperf.pl." />
        </div>
        <div class="col-xs-3">
          <CheckingInput text={verb.perfect} caption="Perfectum" />
        </div>
        <div class="col-xs-1">
          <Notes text={verb.notes}/>
        </div>
      </div>
    );
}
