import { utils } from '../utils';
import { Print } from './print';

export class Stock {

  get remain() {
    return this.prints.length;
  }

  get next() {
    return (this.remain > 0) ? this.prints[0] : null;
  }

  constructor(config) {
    this.config = config;
    const count = config.colors * config.marks * config.same;

    this.prints = utils.line(count)
      .make(index => {
        const same = Math.floor(index / config.same);
        const color = Math.floor(same / config.marks) + 1;
        const mark = (index % config.marks) + 1;
        return new Print(color, mark);
      });

    utils.shuffle(this.prints);
  }

  draw() {
    return this.prints.shift();
  }

  isEmpty() {
    return this.remain === 0;
  }

  peek() {
    const result = this.prints.slice(0, this.config.peek);

    while (result.length < this.config.peek) {
      result.push(null);
    }

    return result;
  }
}
