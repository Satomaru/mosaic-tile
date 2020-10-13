export class Position {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isInRange(leftTop, rightBottom) {
    return (
      (this.x >= leftTop.x && this.x <= rightBottom.x) &&
      (this.y >= leftTop.y && this.y <= rightBottom.y)
    );
  }

  offset(offsetX, offsetY) {
    return new Position(this.x + offsetX, this.y + offsetY);
  }
}
