import React from 'react';
import { JsxHelper } from '../jsx-helper.jsx';
import { Cell } from './cell.jsx';

export class Box extends React.Component {

  render() {
    return new JsxHelper(this).begin((helper) => (
      <div id="box" className={helper.getClassName()}>
        {helper.value.cells.flat().map(cell => <Cell value={cell}/>)}
      </div>
    ));
  }
}
