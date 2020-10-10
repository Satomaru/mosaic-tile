import constant from './constant.json';
import { utils } from '../utils';

export class Wall {

  static get WIDTH() {
    return constant.wall.width;
  }

  static get HEIGHT() {
    return constant.wall.height;
  }

  static isInBox(x, y) {
    return (
      (x >= 0 && x < Wall.WIDTH) &&
      (y >= 0 && y < Wall.HEIGHT)
    );
  }

  static isCorner(x, y) {
    return (
      (x === 0 || x === Wall.WIDTH - 1) &&
      (y === 0 || y === Wall.HEIGHT - 1)
    );
  }

  constructor() {
    this.value = utils.rect(Wall.WIDTH, Wall.HEIGHT).make(null);
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
