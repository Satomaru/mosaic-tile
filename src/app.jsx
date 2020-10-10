import React from 'react';
import ReactDOM from 'react-dom';
import * as deepcopy from 'deepcopy';
import { utils } from './utils';
import { MosaicTile } from './algorithm/mosaic-tile';
import { Board } from './component/board.jsx';
import { Footer } from './component/footer.jsx';
import './app.css';

class App extends React.Component {

  constructor(prop) {
    super(prop);
    this.mosaicTile = new MosaicTile();
    this.state = this.createState();
  }

  createState() {
    return {
      board: {
        box: {
          cells: utils.rect(MosaicTile.WIDTH, MosaicTile.HEIGHT).make((x, y) => ({
            className: MosaicTile.isCorner(x, y) ? 'corner' : null,
            tile: this.mosaicTile.getTile(x, y),
            onClick: () => this.handleClickBox(x, y),
          }))
        },
        stock: {
          remain: this.mosaicTile.remain,
          cells: this.mosaicTile.peekStock().map(tile => ({
            tile: tile
          }))
        },
        status: {
          gameOver: false,
          score: 0
        }
      }
    };
  }

  render() {
    return (
      <div id="app">
        <h1>Mosaic Tile</h1>
        <Board value={this.state.board}/>
        <Footer/>
      </div>
    );
  }

  handleClickBox(x, y) {
    if (!this.mosaicTile.putTile(x, y)) {
      return;
    }

    const state = deepcopy(this. state);
    state.board.box.cells[y][x].tile = this.mosaicTile.getTile(x, y);
    state.board.stock.remain = this.mosaicTile.remain;
    state.board.status.gameOver = this.mosaicTile.isGameOver();
    state.board.status.score = this.mosaicTile.score;

    this.mosaicTile.peekStock().forEach((tile, index) => {
      state.board.stock.cells[index].tile = tile;
    });

    this.setState(state);
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
