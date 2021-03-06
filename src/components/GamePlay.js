import { reactive, ref, watchEffect } from "vue";
import { getSiblingBlock, MINE_RATE } from "./constant";
export class GamePlay {
  blockState = reactive({
    blocks: [],
    hasInitBombs: false,
    bombs: 0,
  });
  constructor(width, height) {
    (this.width = width), (this.height = height);
    this.start();
  }
  start() {
    this.blockState.hasInitBombs = false;
    this.blockState.blocks = Array.from({ length: this.width }, (_, x) =>
      Array.from({ length: this.height }, (_, y) => ({
        y,
        x,
        flag: false, // 是否被标旗
        aroundBomb: 0, // 周围炸弹数
        isBomb: false, // 是否是炸弹
        isCovered: true, // 未被揭开
      }))
    );
  }
  generateBombs(firstBlock) {
    this.blockState.blocks.flat().forEach((block) => {
      // 第一次点击，炸弹必在1m远外
      if (
        Math.abs(firstBlock.x - block.x) <= 1 &&
        Math.abs(firstBlock.y - block.y) <= 1
      ) {
        return "";
      }
      if (Math.random() < MINE_RATE) {
        block.isBomb = true;
        this.blockState.bombs = this.blockState.bombs + 1;
      }
    });
  }

  generateNumber() {
    this.blockState.blocks.flat().forEach((block) => {
      let aroundBomb = 0;
      getSiblingBlock(this.blockState.blocks, block).forEach((item) => {
        if (item.isBomb) {
          aroundBomb = aroundBomb + 1;
        }
      });
      block.aroundBomb = aroundBomb;
    });
  }

  leftClickBlock(block) {
    if(block.isBomb){
      this.watchGameState(true)
      return 
    }

    if (!this.blockState.hasInitBombs) {
      console.log(this.blockState.hasInitBombs)
      this.generateBombs(block);
      this.generateNumber();
      this.blockState.hasInitBombs = true;
    }
    this.coverBlock(block);
  }

  coverBlock(block) {
    if (block.isCovered) {
      this.blockState.blocks[block.x][block.y].isCovered = false;
    }
    if (block.aroundBomb || block.isBomb) {
      return "";
    }

    getSiblingBlock(this.blockState.blocks, block).forEach((item) => {
      if (item.isCovered) {
        this.coverBlock(item);
      }
    });
  }

  rightClickBlock(block) {
    this.blockState.blocks[block.x][block.y].flag = true;
  }
  watchGameState(isLose) {
    if (!this.blockState.hasInitBombs) {
      return "";
    }
    const allBlocksArray = [].concat(...this.blockState.blocks);
    if (allBlocksArray.every((block) => !block.isCovered || block.flag||isLose)) {
      if (allBlocksArray.some((block) => block.isBomb)) {
        alert("lost");
        allBlocksArray.forEach((item) => {
          item.isCovered = false;
        });
      } else {
        alert("win");
      }
    }
  }
}
