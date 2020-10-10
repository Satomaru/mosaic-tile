import constant from './constant.json';
import { Tile } from './tile';
import { utils } from '../utils';

const PEEK_LENGTH = constant.stock.peek;
const TILE_COLORS = constant.stock.colors;
const TILE_MARKS = constant.stock.marks;
const TILE_SAME = constant.stock.same;
const TILE_COUNT = TILE_COLORS * TILE_MARKS * TILE_SAME;

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
        const group = Math.floor(index / TILE_SAME);
        const color = Math.floor(group / TILE_MARKS) + 1;
        const mark = (index % TILE_MARKS) + 1;
        return new Tile(color, mark);
      });

    utils.shuffle(this.value);
  }

  peek() {
    const result = this.value.slice(0, PEEK_LENGTH);

    while (result.length < PEEK_LENGTH) {
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
