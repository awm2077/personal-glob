import BlockUtil from "./BlockUtil.js";

export const ROWS = 4,
  COLS = 4;

export const TETRIS_TYPE = [
  [
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 1, 0, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 0, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0],
  ],
  [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
];
export default class Tetris {
  position = { row: 0, col: 0 };
  blocks = null;

  constructor(type, rotate = 0, position) {
    this.blocks = BlockUtil.deepCopy(
      TETRIS_TYPE[type],
      (block) => block * (type + 1)
    );
  }

  move(offsetRow, offsetCol) {
    this.position.row += offsetRow;
    this.position.col += offsetCol;
  }

  rotate(rotate) {
    BlockUtil.rotate(this.blocks, rotate);
  }
}
