<script setup>
import {  reactive, isReactive } from "vue";
import {
  X_Length,
  Y_Length,
  MINE_RATE,
  getSiblingBlock,
} from "./components/constant";

let hasInitBombs=false

const initBlocks = () => {
  return Array.from({ length: X_Length }, (_, x) =>
    Array.from({ length: Y_Length }, (_, y) => ({
      y,
      x,
      number: 0,
      isBomb: false,
      isCovered: true,
    }))
  );
};
let blocks = reactive(initBlocks());

const generateBombs = () => {
  blocks.flat().forEach((block) => {
    block.isBomb = Math.random() < MINE_RATE;
  });
};

const generateNumber = () => {
  blocks.flat().forEach((block) => {
    let number = 0;
    getSiblingBlock(blocks, block).forEach((item) => {
      if (item.isBomb) {
        number = number + 1;
      }
    });
    block.number = number;
  });
};

const getBlockStyles = (block) => {
  if (!block.isCovered) {
    return {
      backgroundColor: "gray",
    };
  }
  return {
    backgroundColor: "gray",
    color: "gray",
  };
};

const clickBlock = (block) => {
  if(!hasInitBombs){
    generateBombs();
    generateNumber();
    hasInitBombs=true
  }
  if (block.isBomb) {
    alert("you has been die ! ");
  }
  if(block.value==0&&!hasInitBombs){
    getSiblingBlock()
  }
  coverBlock(block)
};

const coverBlock=(block)=>{
  if(block.number===0&&hasInitBombs){
    console.log(getSiblingBlock(blocks,block))
    getSiblingBlock(blocks,block).forEach(item=>{
      if(item.number===0){
        coverBlock(item)
      }
    })
  }
  if(block.isCovered){
    blocks[block.x][block.y].isCovered = false;
  }
}

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
        <div v-else>{{ block.number }}</div>
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
