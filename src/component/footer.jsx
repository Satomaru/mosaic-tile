import React from 'react';
import { JsxHelper } from './jsx-helper.jsx';

export class Footer extends React.Component {

  render() {
    return new JsxHelper(this).begin((helper) => {
      return (
        <div id="footer" className={helper.getClassName()}>
          <p>
            （現在、作成中です。）
         </p>
        </div>
      );
    });
  }
}
