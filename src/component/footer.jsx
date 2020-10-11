import React from 'react';
import { JsxHelper } from './jsx-helper.jsx';

export class Footer extends React.Component {

  render() {
    return new JsxHelper(this).begin((helper) => {
      const constant = helper.value.constant;

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
              <li>1つのタイルと隣接 : +{constant.score.single}</li>
              <li>2つのタイルと隣接 : +{constant.score.double}</li>
              <li>3つのタイルと隣接 : +{constant.score.triple}</li>
              <li>4つのタイルと隣接 : +{constant.score.cross}</li>
            </ul>
          </p>
          <p>
            また、全てのタイルを置いた場合、+{constant.score.all}のスコアを獲得します。<br/>
          </p>
          <p>
            タイルの色は{constant.stock.colors}色、マークは{constant.stock.marks}種類です。<br/>
            同じ色で同じマークのタイルは{constant.stock.same}枚あります。<br/>
          </p>
        </div>
      );
    });
  }
}
