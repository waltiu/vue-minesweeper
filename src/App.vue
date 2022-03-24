<script setup>
import { reactive, isReactive } from "vue";
import {
  X_Length,
  Y_Length,
  MINE_RATE,
  getSiblingBlock,
} from "./components/constant";

let hasInitBombs = false;

const initBlocks = () => {
  return Array.from({ length: X_Length }, (_, x) =>
    Array.from({ length: Y_Length }, (_, y) => ({
      y,
      x,
      aroundBomb: 0,  // 周围炸弹数
      isBomb: false,  // 是否是炸弹
      isCovered: true, // 未被揭开
    }))
  );
};
let blocks = reactive(initBlocks());

const generateBombs = (firstBlock) => {
  blocks.flat().forEach((block) => {
    // 第一次点击，炸弹必在1m远外
    if (
      Math.abs(firstBlock.x - block.x) > 1 &&
      Math.abs(firstBlock.y - block.y) > 1
    ) {
      return "";
    }
    block.isBomb = Math.random() < MINE_RATE;
  });
};

const generateNumber = () => {
  blocks.flat().forEach((block) => {
    let aroundBomb = 0;
    getSiblingBlock(blocks, block).forEach((item) => {
      if (item.isBomb) {
        aroundBomb = aroundBomb + 1;
      }
    });
    block.aroundBomb = aroundBomb;
  });
};

const getBlockStyles = (block) => {
  if (!block.isCovered) {
    return {
      color: "red",
    };
  }
  return {
    backgroundColor: "gray",
    // color: "gray",
  };
};

const clickBlock = (block) => {
  if (block.isBomb) {
    alert("you has been die ! ");
    return "";
  }
  if (!hasInitBombs) {
    generateBombs(block);
    generateNumber();
    hasInitBombs = true;
  }
  coverBlock(block);
};

const coverBlock = (block) => {
  if (block.aroundBomb) {
    return "";
  }
  if (block.isCovered) {
    blocks[block.x][block.y].isCovered = false;
  }
  getSiblingBlock(blocks, block).forEach((item) => {
    console.log(getSiblingBlock(blocks, block), "sibling");
    if (item.isCovered) {
      coverBlock(item);
    }
  });
};
</script>

<template>
  <div class="mines-sweeper">
    <div v-for="raw of blocks" class="raw">
      <div
        v-for="block of raw"
        class="block"
        :style="getBlockStyles(block)"
        @click="clickBlock(block)"
      >
        <div v-if="block.isBomb">炸</div>
        <div v-else>{{ block.aroundBomb }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mines-sweeper {
  .raw {
    margin: 12px;
    display: flex;
    align-items: center;
  }
  .block {
    cursor: pointer;
    margin: 8px;
    padding: 2px;
    border-radius: 2px;
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
  }
}
</style>
