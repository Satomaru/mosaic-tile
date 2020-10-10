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

    try {
      this.mosaicTile = new MosaicTile();
      this.state = this.createState();
    } catch (error) {
      window.alert(error.message);
    }
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
          result: null
        }
      }
    };
  }

  render() {
    try {
      return (
        <div id="app">
          <h1>Mosaic Tile</h1>
          <Board value={this.state.board}/>
          <Footer/>
        </div>
      );
    } catch (error) {
      window.alert(error.message);
    }
  }

  handleClickBox(x, y) {
    const result = this.mosaicTile.putTile(x, y);

    if (!result) {
      return;
    }

    const state = deepcopy(this. state);
    state.board.box.cells[y][x].tile = this.mosaicTile.getTile(x, y);
    state.board.stock.remain = this.mosaicTile.remain;
    state.board.status.gameOver = this.mosaicTile.isGameOver();
    state.board.status.result = result;

    this.mosaicTile.peekStock().forEach((tile, index) => {
      state.board.stock.cells[index].tile = tile;
    });

    this.setState(state);
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
