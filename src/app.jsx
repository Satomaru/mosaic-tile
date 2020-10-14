import React from 'react';
import ReactDOM from 'react-dom';
import * as deepcopy from 'deepcopy';
import { utils } from './utils';
import config from './config.json';
import { MosaicTile } from './algorithm/mosaic-tile';
import { Position } from './utils';
import { Board } from './component/board.jsx';
import { Footer } from './component/footer.jsx';
import './app.css';

class App extends React.Component {

  constructor(prop) {
    super(prop);

    utils.alertWhenError(() => {
      this.mosaicTile = new MosaicTile(config);
      this.state = this.createState();
    });
  }

  createState() {
    return {
      board: {
        box: {
          cells: utils.rect(config.wall.width, config.wall.height).make((x, y) => ({
            className: this.mosaicTile.isStartable(new Position(x, y)) ? 'startable' : null,
            check: 0,
            onClick: () => this.handleClickBox(x, y),
            onContextMenu: () => this.handleContextMenuBox(x, y)
          }))
        },
        next: {
          remain: this.mosaicTile.remain,
          cells: this.mosaicTile.getNext().map(tile => ({
            tile: tile
          }))
        },
        status: {
          score: 0,
          arts: [],
          gameOver: false
        }
      },
      footer: {
        config: config
      }
    };
  }

  render() {
    return utils.alertWhenError(() => (
      <div id="app">
        <h1>Mosaic Tile</h1>
        <Board value={this.state.board}/>
        <Footer value={this.state.footer}/>
      </div>
    ));
  }

  handleClickBox(x, y) {
    const result = this.mosaicTile.putTile(new Position(x, y));

    if (!result) {
      return;
    }

    const state = deepcopy(this.state);
    state.board.box.cells[y][x].tile = result.tile;
    state.board.next.remain = this.mosaicTile.remain;
    state.board.status.score = this.mosaicTile.score;
    state.board.status.arts = result.arts;
    state.board.status.gameOver = this.mosaicTile.isGameOver();

    this.mosaicTile.getNext().forEach((tile, index) => {
      state.board.next.cells[index].tile = tile;
    });

    this.setState(state);
  }

  handleContextMenuBox(x, y) {
    const state = deepcopy(this.state);
    const cell = state.board.box.cells[y][x];
    cell.check = 1 - cell.check;
    this.setState(state);
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
