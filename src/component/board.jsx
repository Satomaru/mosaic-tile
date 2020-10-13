import React from 'react';
import { JsxHelper } from './jsx-helper.jsx';
import { Box } from './box.jsx';
import { Next } from './next.jsx';
import { Status } from './status.jsx'

export class Board extends React.Component {

  render() {
    return new JsxHelper(this).begin((helper) => (
      <div id="board" className={helper.getClassName()}>
        <Box value={helper.value.box}/>
        <div className="info">
          <Next value={helper.value.next}/>
          <Status value={helper.value.status}/>
        </div>
      </div>
    ));
  }
}
