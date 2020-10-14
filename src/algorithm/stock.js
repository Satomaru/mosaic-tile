import { utils } from '../utils';
import { Tile } from './tile';

export class Stock {

  get remain() {
    return this.tiles.length;
  }

  get next() {
    return (this.remain > 0) ? this.tiles[0] : null;
  }

  constructor(config) {
    this.config = config;
    const count = config.colors * config.marks * config.same;

    this.tiles = utils.line(count)
      .make(index => {
        const same = Math.floor(index / config.same);
        const color = Math.floor(same / config.marks) + 1;
        const mark = (index % config.marks) + 1;
        return new Tile(color, mark);
      });

    utils.shuffle(this.tiles);
  }

  draw() {
    return this.tiles.shift();
  }

  isEmpty() {
    return this.remain === 0;
  }

  peek() {
    const result = this.tiles.slice(0, this.config.peek);

    while (result.length < this.config.peek) {
      result.push(null);
    }

    return result;
  }
}
