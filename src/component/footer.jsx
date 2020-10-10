import React from 'react';
import { JsxHelper } from './jsx-helper.jsx';

export class Footer extends React.Component {

  render() {
    return new JsxHelper(this).begin((helper) => {
      return (
        <div id="footer" className={helper.getClassName()}>
          <h2>遊び方</h2>
          <p>
            タイルを敷き詰めてください。<br/>
            四隅、または既に置いているタイルの隣に置くことができます。<br/>
            ただし、色かマークが隣のタイルと同じである必要があります。<br/>
          </p>
          <p>
            タイルの隣に置いた場合、スコアを獲得します。
            <ul>
              <li>1つのタイルと隣接 : +1</li>
              <li>2つのタイルと隣接 : +5</li>
              <li>3つのタイルと隣接 : +15</li>
              <li>4つのタイルと隣接 : +50</li>
            </ul>
          </p>
          <p>
            また、全てのタイルを置けた場合、+100のスコアを獲得します。<br/>
          </p>
          <p>
            タイルの色およびマークは、各5種類あります。<br/>
            同じ色で同じマークのタイルは3枚あります。<br/>
          </p>
        </div>
      );
    });
  }
}
