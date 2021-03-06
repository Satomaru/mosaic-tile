import playJsUtils from 'play-js-utils';

export class Wall {

  constructor(config) {
    this.positions = [];
    this.tiles = playJsUtils.Rect.make(config.width, config.height).array;
    this.max = new playJsUtils.Position(config.width - 1, config.height - 1);
  }

  addTile(position, tile) {
    if (position.isInside(this.max)) {
      this.positions.push(position);
      position.point(this.tiles).write(tile);
    }
  }

  getTile(position) {
    const inRange = position.isInside(this.max);
    return inRange ? position.point(this.tiles).read() : null;
  }
}
