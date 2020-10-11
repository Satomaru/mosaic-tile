import constant from './constant.json';
import { Wall } from './wall';
import { Stock } from './stock';
import { utils } from '../utils';

export class MosaicTile {

  get remain() {
    return this.stock.remain;
  }

  static isCorner(x, y) {
    return Wall.isCorner(x, y);
  }

  constructor() {
    this.wall = new Wall();
    this.stock = new Stock();
    this.score = 0;
  }

  putTile(x, y) {
    if (this.stock.isEmpty()) {
      return null;
    }

    const verified = this.verifyTile(x, y);

    if (!verified) {
      return null;
    }

    this.wall.setTile(x, y, this.stock.draw());
    return this.createResult(verified);
  }

  isGameOver() {
    if (this.stock.isEmpty()) {
      return true;
    }

    for (let y = 0; y < constant.wall.height; y++) {
      for (let x = 0; x < constant.wall.width; x++) {
        if (this.verifyTile(x, y)) {
          return false;
        }
      }
    }

    return true;
  }

  verifyTile(x, y) {
    if (this.wall.isThere(x, y)) {
      return null;
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

      return null;
    }

    if (linkables === 0 && !Wall.isCorner(x, y)) {
      return null;
    }

    return { link: linkables };
  }

  createResult(verified) {
    const arts = [];

    if (verified.link) {
      const names = ['single', 'double', 'triple', 'cross'];
      const name = names[verified.link - 1];
      const score = constant.score[name];

      arts.push(name + ' +' + score);
      this.score += score;
    }

    if (this.stock.isEmpty()) {
      this.score += constant.score.all;
      arts.push('all +' + constant.score.all);
    }

    return {
      score: this.score,
      arts: arts
    };
  }

  getTile(x, y) {
    return this.wall.getTile(x, y);
  }

  peekStock() {
    return this.stock.peek();
  }
}
