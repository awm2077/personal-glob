import BlockUtil from "./BlockUtil.js";
import PlayField, { COLS as PLAYFIELD_COLS } from "./PlayField.js";
import Tetris, {
  TETRIS_TYPE,
  ROWS as TETRIS_ROWS,
  COLS as TETRIS_COLS,
} from "./Tetris.js";

let dropTimer = null;
let dropTimerCnt = 0;
const MAX_DROP_DELAY = 10;
let dropDelay = MAX_DROP_DELAY;
Vue.createApp({
  data() {
    return {
      PlayField: new PlayField(),
      NextTetris: null,
      CurTetris: null,
      ClearableLines: [],
      isGameOver: false,
      Score: 0,
      isPause: false,
      isStart: false,
    };
  },
  computed: {
    PlayFieldBlocks() {
      if (!this.CurTetris) return this.PlayField.blocks;

      const pBlock = BlockUtil.deepCopy(this.PlayField.blocks);
      const { blocks: tBlocks, position } = this.CurTetris;
      const { row: offsetRow, col: offsetCol } = position;
      return BlockUtil.merge(pBlock, tBlocks, offsetRow, offsetCol);
    },
    level() {
      return Math.floor(this.Score / 5000) + 1;
    },
  },
  methods: {
    // 新房快
    createNextTetris() {
      const type = Math.floor(Math.random() * TETRIS_TYPE.length);
      const rotate = Math.floor(Math.random() * 3);
      this.NextTetris = new Tetris(type, rotate);
    },
    dropTetris() {
      this.CurTetris = this.NextTetris;
      this.CurTetris.position = {
        row: -TETRIS_ROWS,
        col: Math.floor((PLAYFIELD_COLS - TETRIS_COLS) / 2),
      };
      for (let i = 0; i < TETRIS_ROWS; i++) {
        if (!this.moveTetris(1, 0)) break;
      }
      this.createNextTetris();
    },
    // 越界函数
    isCollided(offsetRow, offsetCol, rotate) {
      return this.PlayField.isCollided(
        this.CurTetris,
        offsetRow,
        offsetCol,
        rotate
      );
    },
    moveTetris(offsetRow, offsetCol) {
      if (!this.isCollided(offsetRow, offsetCol, 0)) {
        this.CurTetris.move(offsetRow, offsetCol);
        return true;
      } else {
        if (offsetRow > 0) this.fixTetris();
        return false;
      }
    },
    rotateTetris(rotate) {
      if (!this.isCollided(0, 0, rotate)) {
        this.CurTetris.rotate(rotate);
      }
    },
    addScore(score) {
      this.Score += score;
      dropDelay = Math.max(MAX_DROP_DELAY - this.level + 1, 1);
    },
    // 固定落到底部的
    fixTetris() {
      this.addScore(50);
      this.PlayField.merge(this.CurTetris);
      if (this.CurTetris.position.row < 0) {
        this.gameOver();
      } else {
        // 清除行
        this.clearLines();
        this.dropTetris();
      }
    },
    clearLines() {
      const { row: from } = this.CurTetris.position;
      const clearLines = (this.ClearableLines =
        this.PlayField.getClearableLines(from, from + TETRIS_ROWS));

      if (clearLines.length) {
        this.addScore(2 ** clearLines.length * 100);
        setTimeout(() => {
          this.PlayField.clearLines(clearLines);
          clearLines.splice(0);
        }, 400);
      }
    },
    // 自动落下定时器
    startDropTimer() {
      if (!dropTimer) {
        dropTimer = setInterval(() => {
          if (dropTimerCnt++ > dropDelay) {
            this.moveTetris(1, 0);
            dropTimerCnt = 0;
          }
        }, 50);
      }
    },
    stopDropTimer() {
      if (dropTimer) {
        clearInterval(dropTimer);
        dropTimer = null;
      }
    },
    gameOver() {
      this.stopDropTimer();
      this.isGameOver = true;
      this.isStart = false;
    },
    onKeydown(e) {
      if (!this.isStart || this.isPause) return;
      switch (e.code) {
        case "ArrowUp":
          this.rotateTetris(-1);
          break;
        case "ArrowDown":
          this.moveTetris(1, 0);
          break;
        case "ArrowLeft":
          this.moveTetris(0, -1);
          break;
        case "ArrowRight":
          this.moveTetris(0, 1);
          break;
      }
    },
    start() {
      this.isGameOver = false;
      this.isStart = true;
      this.Score = 0;
      this.dropDelay = MAX_DROP_DELAY;
      this.CurTetris = null;
      this.PlayField.clearAll();
      this.dropTetris();
      this.startDropTimer();
    },
    pause() {
      this.stopDropTimer();
      this.isPause = true;
    },
    resume() {
      this.startDropTimer();
      this.isPause = false;
    },
  },
  mounted() {
    document.addEventListener("keydown", this.onKeydown);
    this.createNextTetris();
  },
}).mount("#app");
