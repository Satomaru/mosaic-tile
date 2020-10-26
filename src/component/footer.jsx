import { React, Component } from 'play-js-react';

export class Footer extends Component {

  createView = () => (
    <div id="footer">
      <h2>遊び方</h2>
      <p>
        タイルを敷き詰めてください。<br/>
        四隅、または既に置いているタイルの隣に置くことができます。<br/>
        ただし、色かマークが隣のタイルと同じである必要があります。<br/>
      </p>
      <p>
        タイルの隣に置いた場合、スコアを獲得します。
        <ul>
          <li>1つのタイルと隣接 : +{this.props.value.score.single}</li>
          <li>2つのタイルと隣接 : +{this.props.value.score.double}</li>
          <li>3つのタイルと隣接 : +{this.props.value.score.triple}</li>
          <li>4つのタイルと隣接 : +{this.props.value.score.cross}</li>
        </ul>
      </p>
      <p>
        また、全てのタイルを置いた場合、+{this.props.value.score.all}のスコアを獲得します。<br/>
      </p>
      <p>
        タイルの色は{this.props.value.stock.colors}色、マークは{this.props.value.stock.marks}種類です。<br/>
        同じ色で同じマークのタイルは{this.props.value.stock.same}枚あります。<br/>
      </p>
      <p>
        マウスを使用している場合は、<br/>
        右クリックでマスの色を変えることができます。<br/>
        ゲーム上の意味はありませんが、攻略に役立ててください。<br/>
      </p>
    </div>
  );
}
