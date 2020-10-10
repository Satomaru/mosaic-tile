import { Wall } from './wall';
import { Stock } from './stock';
import { utils } from '../utils';

export class MosaicTile {

  static get WIDTH() {
    return Wall.WIDTH;
  }

  static get HEIGHT() {
    return Wall.HEIGHT;
  }

  static isCorner(x, y) {
    return Wall.isCorner(x, y);
  }

  get remain() {
    return this.stock.remain;
  }

  get score() {
    return 0;
  }

  constructor() {
    this.wall = new Wall();
    this.stock = new Stock();
  }

  putTile(x, y) {
    if (this.stock.isEmpty()) {
      return false;
    }

    if (!this.isPuttable(x, y)) {
      return false;
    }

    this.wall.setTile(x, y, this.stock.draw());
    return true;
  }

  isGameOver() {
    if (this.stock.isEmpty()) {
      return true;
    }

    for (let y = 0; y < Wall.HEIGHT; y++) {
      for (let x = 0; x < Wall.WIDTH; x++) {
        if (this.isPuttable(x, y)) {
          return false;
        }
      }
    }

    return true;
  }

  isPuttable(x, y) {
    if (this.wall.isThere(x, y)) {
      return false;
    }

    let linkables = 0;

    const testLink = (other) => {
      if (other) {
        if (this.stock.next.isLinkableWith(other)) {
          ++linkables;
        } else {
          return false;
        }
      }

      return true;
    };

    if (!testLink(this.wall.getTop(x, y))
      || !testLink(this.wall.getRight(x, y))
      || !testLink(this.wall.getBelow(x, y))
      || !testLink(this.wall.getLeft(x, y))) {

      return false;
    }

    if (linkables === 0 && !Wall.isCorner(x, y)) {
      return false;
    }

    return true;
  }

  getTile(x, y) {
    return this.wall.getTile(x, y);
  }

  peekStock() {
    return this.stock.peek();
  }
}
