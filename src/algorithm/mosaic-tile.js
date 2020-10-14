import { utils } from '../utils';
import { Wall } from './wall';
import { Stock } from './stock';
import { Position } from '../utils';

export class MosaicTile {

  get remain() {
    return this.stock.remain;
  }

  constructor(config) {
    this.config = config;
    this.wall = new Wall(config.wall);
    this.stock = new Stock(config.stock);
    this.score = 0;
  }

  putTile(position) {
    if (this.stock.isEmpty()) {
      return null;
    }

    const verified = this.verifyTile(position);

    if (!verified) {
      return null;
    }

    this.wall.addTile(position, this.stock.draw());
    return this.createResult(verified);
  }

  createResult(verified) {
    const arts = [];

    if (verified.link) {
      const names = ['single', 'double', 'triple', 'cross'];
      const name = names[verified.link - 1];
      const score = this.config.score[name];

      arts.push(name + ' +' + score);
      this.score += score;
    }

    if (this.stock.isEmpty()) {
      this.score += this.config.score.all;
      arts.push('all +' + this.config.score.all);
    }

    return {
      arts: arts,
      tile: verified.tile
    };
  }

  isGameOver() {
    if (this.stock.isEmpty()) {
      return true;
    }

    for (let y = 0; y < this.config.wall.height; y++) {
      for (let x = 0; x < this.config.wall.width; x++) {
        if (this.verifyTile(new Position(x, y))) {
          return false;
        }
      }
    }

    return true;
  }

  verifyTile(position) {
    if (this.wall.getTile(position)) {
      return null;
    }

    const tile = this.stock.next;
    let linkables = 0;

    const testLink = (other) => {
      if (other) {
        if (tile.isLinkableWith(other)) {
          ++linkables;
        } else {
          return false;
        }
      }

      return true;
    };

    if (!testLink(this.wall.getTile(position.offset(0, -1)))
      || !testLink(this.wall.getTile(position.offset(0, 1)))
      || !testLink(this.wall.getTile(position.offset(1, 0)))
      || !testLink(this.wall.getTile(position.offset(-1, 0)))) {

      return null;
    }

    if (linkables === 0 && !this.isStartable(position)) {
      return null;
    }

    return {
      link: linkables,
      tile: tile
    };
  }

  isStartable(position) {
    return position.handle((x, y) =>
      (x === 0 || x === this.config.wall.width - 1) &&
      (y === 0 || y === this.config.wall.height - 1)
    );
  }

  getNext() {
    return this.stock.peek();
  }
}
