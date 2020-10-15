import React from 'react';
import { JsxHelper } from '../jsx-helper.jsx';

export class Status extends React.Component {

  render() {
    return new JsxHelper(this).begin((helper) => {
      return (
        <div id="score" className={helper.getClassName()}>
          <p>
            Score: {helper.value?.score || 0}<br/>
            <ul>
              {helper.value?.arts.map(art => <li>{art}</li>)}
            </ul>
          </p>
          <p>
            {helper.value?.gameOver && 'Game Over'}
          </p>
        </div>
      );
    });
  }
}
