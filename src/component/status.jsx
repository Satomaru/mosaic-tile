import React from 'react';
import { JsxHelper } from './jsx-helper.jsx';

export class Status extends React.Component {

  render() {
    return new JsxHelper(this).begin((helper) => {
      return (
        <div id="score" className={helper.getClassName()}>
          <p>
            スコア: {helper.value.score}
          </p>
          <p>
            {helper.value.gameOver && 'ゲームオーバー'}
          </p>
        </div>
      );
    });
  }
}
