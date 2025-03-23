function createRow(cols) {
  return new Array(cols).fill(0);
}

function createBlock(rows, cols) {
  return new Array(rows).fill().map(() => createRow(cols));
}

function deepCopy(blocks, callback) {
  return blocks.map((row) =>
    row.map((block) => (callback ? callback(block) : block))
  );
}

function merge(des, src, offsetRow, offsetCol) {
  for (let i = 0; i < src.length; i++) {
    for (let j = 0; j < src[i].length; j++) {
      const dr = i + offsetRow,
        dc = j + offsetCol;
      if (
        src[i][j] &&
        dr >= 0 &&
        dr < des.length &&
        dc >= 0 &&
        dc < des[dr].length &&
        !des[dr][dc]
      ) {
        des[dr][dc] = src[i][j];
      }
    }
  }
  return des;
}

// 数组对调
// 对角线交换
function diagonalSwap(blocks) {
  for (let r = 0; r < blocks.length; r++) {
    for (let c = r + 1; c < blocks[r].length; c++) {
      [blocks[r][c], blocks[c][r]] = [blocks[c][r], blocks[r][c]];
    }
  }
}
// 上下交换
function upDownSwap(blocks) {
  for (let r = 0; r < blocks.length / 2; r++) {
    [blocks[r], blocks[blocks.length - r - 1]] = [
      blocks[blocks.length - r - 1],
      blocks[r],
    ];
  }
}
function rotate(blocks, rotate = -1) {
  for (let i = 0; i < Math.abs(rotate); i++) {
    if (rotate > 0) {
      upDownSwap(blocks);
      diagonalSwap(blocks);
    } else {
      diagonalSwap(blocks);
      upDownSwap(blocks);
    }
  }
}

export default {
  createRow,
  createBlock,
  deepCopy,
  merge,
  rotate,
};
