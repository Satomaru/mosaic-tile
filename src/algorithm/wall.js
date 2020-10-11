import constant from './constant.json';
import { utils } from '../utils';

export class Wall {

  static isInBox(x, y) {
    return (
      (x >= 0 && x < constant.wall.width) &&
      (y >= 0 && y < constant.wall.height)
    );
  }

  static isCorner(x, y) {
    return (
      (x === 0 || x === constant.wall.width - 1) &&
      (y === 0 || y === constant.wall.height - 1)
    );
  }

  constructor() {
    this.value = utils.rect(constant.wall.width, constant.wall.height).make(null);
  }

  setTile(x, y, tile) {
    if (Wall.isInBox(x, y)) {
      this.value[y][x] = tile;
    }
  }

  getTile(x, y) {
    return (Wall.isInBox(x, y)) ? this.value[y][x] : null;
  }

  getTop(x, y) {
    return this.getTile(x, y - 1);
  }

  getRight(x, y) {
    return this.getTile(x + 1, y);
  }

  getBelow(x, y) {
    return this.getTile(x, y + 1);
  }

  getLeft(x, y) {
    return this.getTile(x - 1, y);
  }

  isThere(x, y) {
    return this.getTile(x, y) !== null;
  }
}
