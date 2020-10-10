import React from 'react';
import { JsxHelper } from './jsx-helper.jsx';
import { Box } from './box.jsx';
import { Stock } from './stock.jsx';
import { Status } from './status.jsx'

export class Board extends React.Component {

  render() {
    return new JsxHelper(this).begin((helper) => {
      return (
        <div id="board" className={helper.getClassName()}>
          <Box value={helper.value.box}/>
          <div className="info">
            <Stock value={helper.value.stock}/>
            <Status value={helper.value.status}/>
          </div>
        </div>
      );
    });
  }
}