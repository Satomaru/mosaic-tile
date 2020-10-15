export class Position {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isInside(max) {
    return (
      (this.x >= 0 && this.x <= max.x) &&
      (this.y >= 0 && this.y <= max.y)
    );
  }

  isInRangeOf(min, max) {
    return (
      (this.x >= min.x && this.x <= max.x) &&
      (this.y >= min.y && this.y <= max.y)
    );
  }

  offset(offsetX, offsetY) {
    return new Position(this.x + offsetX, this.y + offsetY);
  }

  handle(callback) {
    return callback(this.x, this.y);
  }

  point(array) {
    return {
      read: () => array[this.y][this.x],
      write: (value) => array[this.y][this.x] = value
    }
  }
}

export const utils = {

  array: (target) => ({
    forEach2d: (callback) => target.forEach((row, y) =>
      row.forEach((cell, x) => callback(x, y, cell))
    )
  }),

  line: (length) => ({
    make: (valueOrFunction) => {
      const line = Array(length);

      if (typeof valueOrFunction === 'function') {
        return line.fill().map((value, index) => valueOrFunction(index));
      }

      if (valueOrFunction !== undefined) {
        return line.fill(valueOrFunction);
      } else {
        return line.fill();
      }
    },

    forEach: (callback) => {
      for (let i = 0; i < length; i++) {
        callback(i);
      }
    }
  }),

  rect: (width, height) => ({
    make: (valueOrFunction) => {
      return utils.line(height).make((y) => {
        let cellSupplier = valueOrFunction;

        if (typeof valueOrFunction === 'function') {
          cellSupplier = (x) => valueOrFunction(x, y);
        }

        return utils.line(width).make(cellSupplier);
      });
    },

    forEach: (callback) => {
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          callback(x, y);
        }
      }
    }
  }),

  square: (size) => ({
    make: (valueOrFunction) => {
      return utils.rect(size, size).make(valueOrFunction);
    },

    forEach: (callback) => utils.rect(size, size).forEach(callback)
  }),

  random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

  shuffle: (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const x = utils.random(0, i);
      [array[i], array[x]] = [array[x], array[i]];
    }

    return array;
  }
};
