export class Print {

  constructor(color, mark) {
    this.color = color;
    this.mark = mark;
  }

  isLinkableWith(other) {
    return this.color === other?.color || this.mark === other?.mark;
  }
}
