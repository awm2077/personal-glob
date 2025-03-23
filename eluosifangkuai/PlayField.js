import BlockUtil from "./BlockUtil.js";

export const ROWS = 20,
  COLS = 10;

export default class PlayField {
  blocks = null;

  constructor() {
    this.blocks = BlockUtil.createBlock(ROWS, COLS);
  }

  isCollided(tetris, offsetRow, offsetCol, rotate) {
    const temBlocks = BlockUtil.deepCopy(tetris.blocks);
    let { row: tr, col: tc } = tetris.position;

    tr += offsetRow;
    tc += offsetCol;
    BlockUtil.rotate(temBlocks, rotate);

    for (let r = 0; r < temBlocks.length; r++) {
      const pr = r + tr;
      if (pr < 0) continue;
      for (let c = 0; c < temBlocks[r].length; c++) {
        const pc = c + tc;
        if (
          temBlocks[r][c] &&
          (pr >= ROWS || pc < 0 || pc >= COLS || this.blocks[pr][pc])
        ) {
          return true;
        }
      }
    }
    return false;
  }

  merge(tetris) {
    const { blocks: tBlocks, position } = tetris;
    const { row: offsetRow, col: offsetCol } = position;

    BlockUtil.merge(this.blocks, tBlocks, offsetRow, offsetCol);
  }

  //   计算可以消除的行
  getClearableLines(from, to) {
    const lineToClear = [];
    for (let r = from; r < Math.min(to, ROWS); r++) {
      if (this.blocks[r].every((c) => !!c)) {
        lineToClear.push(r);
      }
    }
    return lineToClear;
  }
  clearLines(line) {
    line.forEach((r, i) => this.blocks.splice(r - i, 1));
    this.blocks.unshift(...BlockUtil.createBlock(line.length, COLS));
  }

  clearAll() {
    this.blocks.forEach((r) => r.fill(0));
  }
}
