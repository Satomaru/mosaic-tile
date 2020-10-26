import { React, ReactDOM, Component } from 'play-js-react';
import playJsUtils from 'play-js-utils';
import config from './config.json';
import { MosaicTile } from './algorithm/mosaic-tile';
import { Box } from './component/box.jsx';
import { Next } from './component/next.jsx';
import { Status } from './component/status.jsx'
import { Footer } from './component/footer.jsx';
import './app.css';

class App extends Component {

  handleClickBox = (position) => {
    const result = this.mosaicTile.putTile(position);

    if (!result) {
      return;
    }

    const next = {
      remain: this.mosaicTile.remain,
      cells: this.mosaicTile.getNext().map(tile => ({
        color: tile.color,
        mark: tile.mark
      }))
    };

    const status = {
      score: this.mosaicTile.score,
      arts: result.arts,
      gameOver: this.mosaicTile.isGameOver()
    };

    this.setStateOrAlert((state, props) => {
      const box = Object.assign({}, state.box);
      const cell = position.point(box.cells).read();
      cell.color = result.tile.color;
      cell.mark = result.tile.mark;

      return { box: box, next: next, status: status };
    });
  }

  handleContextMenuBox = (position) => {
    this.setStateOrAlert((state, props) => {
      const box = Object.assign({}, state.box);
      const cell = position.point(box.cells).read();
      cell.check = 1 - (cell.check ?? 0);
      return { box: box };
    });
  }

  createView = () => (
    <div id="app">
      <h1>Mosaic Tile</h1>

      <div id="board">
        <Box
          value={this.state.box}
          onClick={this.handleClickBox}
          onContextMenu={this.handleContextMenuBox}/>
    
        <div className="info">
          <Next value={this.state.next}/>
          <Status value={this.state.status}/>
        </div>
      </div>

      <Footer value={config}/>
    </div>
  );

  constructor(prop) {
    super(prop);

    Component.alertWhenError(() => {
      this.mosaicTile = new MosaicTile(config);

      this.state = {
        box: {
          cells: playJsUtils.Rect.make(config.wall.width, config.wall.height, (x, y) => ({
            position: new playJsUtils.Position(x, y),
            startable: this.mosaicTile.isStartable(new playJsUtils.Position(x, y))
          })).array
        },
        next: {
          remain: this.mosaicTile.remain,
          cells: this.mosaicTile.getNext().map(tile => ({
            color: tile.color,
            mark: tile.mark
          }))
        },
        status: {
          score: 0,
          arts: [],
          gameOver: false
        }
      };
    });
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
