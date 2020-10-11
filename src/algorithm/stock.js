import constant from './constant.json';
import { Tile } from './tile';
import { utils } from '../utils';

const TILE_COUNT = constant.stock.colors * constant.stock.marks * constant.stock.same;

export class Stock {

  get remain() {
    return this.value.length;
  }

  get next() {
    return (this.remain > 0) ? this.value[0] : null;
  }

  constructor() {
    this.value = utils.line(TILE_COUNT)
      .make(index => {
        const same = Math.floor(index / constant.stock.same);
        const color = Math.floor(same / constant.stock.marks) + 1;
        const mark = (index % constant.stock.marks) + 1;
        return new Tile(color, mark);
      });

    utils.shuffle(this.value);
  }

  peek() {
    const result = this.value.slice(0, constant.stock.peek);

    while (result.length < constant.stock.peek) {
      result.push(null);
    }

    return result;
  }

  draw() {
    return this.value.shift();
  }

  isEmpty() {
    return this.remain === 0;
  }
}
