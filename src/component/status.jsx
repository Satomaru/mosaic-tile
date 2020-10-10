import React from 'react';
import { JsxHelper } from './jsx-helper.jsx';

export class Status extends React.Component {

  render() {
    return new JsxHelper(this).begin((helper) => {
      const result = helper.value.result;

      return (
        <div id="score" className={helper.getClassName()}>
          <p>
            Score: {result?.score || 0}<br/>
            <ul>
              {result?.arts.map(art => <li>{art}</li>)}
            </ul>
          </p>
          <p>
            {helper.value.gameOver && 'Game Over'}
          </p>
        </div>
      );
    });
  }
}
