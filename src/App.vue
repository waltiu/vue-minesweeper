<script setup>
import { watchEffect, ref,isRef,reactive  } from "vue";
import {
  X_Length,
  Y_Length,
  MINE_RATE,
  getSiblingBlock,
} from "./components/constant";
let blocks = ref([]);
console.log(blocks,'block')
const initBlocks = () => {
  blocks.value = Array.from({ length: X_Length }, (_, x) =>
    Array.from({ length: Y_Length }, (_, y) => ({
      y,
      x,
      value: 0,
      isBomb: false, 
      isCovered:true
    }))
  );
  console.log(blocks, "blocks");
};

const generateMines = () => {
  blocks.value  = blocks.value .map((raw) => {
    return raw.map((block) => {
      return {
        ...block,
        isBomb: Math.random() < MINE_RATE,
      };
    });
  });
};

const generateNumber = () => {
  blocks.value  = blocks.value .map((raw) => {
    return raw.map((block) => {
      let value = 0;
      if (!block.isBomb) {
        getSiblingBlock(blocks.value, block).forEach((item) => {
          if (item.isBomb) {
            value = value  + 1;
          }
        });
      }
      return {
        ...block,
        value,
      };
    });
  });
};

const getBlockStyles = (block) => {
  if(!block.isCovered){
    return {
          backgroundColor: "gray",
    }
  }
  return {
    backgroundColor: "gray",
    color:"gray"
  };
};

 const clickBlock =(block)=>{
  if(block.isBomb){
    alert('you has been die ! ')
  }
  blocks.value [block.x][block.y].isCovered=false
}

console.log(isRef(blocks))
initBlocks();
generateMines();
generateNumber();
console.log(blocks, "blocks");
</script>

<template>
  <div class="mines-sweeper">
    <div v-for="raw of blocks" class="raw">
      <div v-for="block of raw" class="block" :style="getBlockStyles(block)" @click="clickBlock(block)">
        <div v-if="block.isBomb">炸弹</div>
        <div v-else>{{ block.isCovered }}</div>
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
