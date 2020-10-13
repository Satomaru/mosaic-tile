import React from 'react';
import { JsxHelper } from './jsx-helper.jsx';

export class Footer extends React.Component {

  render() {
    return new JsxHelper(this).begin((helper) => {
      const config = helper.value.config;

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
              <li>1つのタイルと隣接 : +{config.score.single}</li>
              <li>2つのタイルと隣接 : +{config.score.double}</li>
              <li>3つのタイルと隣接 : +{config.score.triple}</li>
              <li>4つのタイルと隣接 : +{config.score.cross}</li>
            </ul>
          </p>
          <p>
            また、全てのタイルを置いた場合、+{config.score.all}のスコアを獲得します。<br/>
          </p>
          <p>
            タイルの色は{config.stock.colors}色、マークは{config.stock.marks}種類です。<br/>
            同じ色で同じマークのタイルは{config.stock.same}枚あります。<br/>
          </p>
        </div>
      );
    });
  }
}
