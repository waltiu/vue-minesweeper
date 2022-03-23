<script setup >
import { watchEffect, reactive } from "vue";
import { xLength, yLength } from "./components/constant";
let blocks=[]
const initBlocks = () => {
   blocks = Array.from({ length: xLength }, (_,x) =>
    Array.from({ length: yLength },(_,y)=>({
      y,
      x,
      value:0
    }))
  );
  console.log(blocks,'blocks');
};

initBlocks();
console.log(blocks,'blocks')
</script>

<template>
  <div class="mines-sweeper">
    <div v-for="raw of blocks " class="raw">
        <span v-for="block of raw" class="block">
        {{block.x}}:{{block.y}}
        </span>
    </div>
  </div>
</template>

<style lang="scss">
.mines-sweeper {
  .raw{
    margin: 12px;
  }
  .block{
    margin: 8px;
  }
}

</style>
