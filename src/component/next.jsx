import React from 'react';
import { JsxHelper } from '../jsx-helper.jsx';
import { Cell } from './cell.jsx';
import { CaretLeft } from './icons.jsx';

export class Next extends React.Component {

  render() {
    return new JsxHelper(this).begin((helper) => (
      <div id="next" className={helper.getClassName()}>
        <div className="tiles">
          {helper.value.cells.map(cell => <Cell value={cell}/>)}
        </div>
        <div className="remain">
          <CaretLeft/><span>{helper.value.remain}</span>
        </div>
      </div>
    ));
  }
}
