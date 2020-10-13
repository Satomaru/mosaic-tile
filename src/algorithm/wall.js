import { utils } from '../utils';
import { Position } from './position';

export class Wall {

  constructor(config) {
    this.positions = [];
    this.prints = utils.rect(config.width, config.height).make(null);
    this.leftTop = new Position(0, 0);
    this.rightBottom = new Position(config.width - 1, config.height - 1);
  }

  addPrint(position, print) {
    if (position.isInRange(this.leftTop, this.rightBottom)) {
      this.positions.push(position);
      this.prints[position.y][position.x] = print;
    }
  }

  getPrint(position) {
    const inRange = position.isInRange(this.leftTop, this.rightBottom);
    return inRange ? this.prints[position.y][position.x] : null;
  }
}
