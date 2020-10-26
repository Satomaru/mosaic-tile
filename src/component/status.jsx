import { React, Component } from 'play-js-react';

export class Status extends Component {

  createView = () => (
    <div id="status">
      <p>
        Score: {this.props.value.score ?? 0}<br/>
        <ul>
          {this.props.value.arts.map((art) => <li>{art}</li>)}
        </ul>
      </p>
      <p>
        {this.props.value.gameOver && 'Game Over'}
      </p>
    </div>
  );
}
