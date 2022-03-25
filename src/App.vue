<script setup>
import { toRefs, watchEffect } from "vue";
import { GamePlay } from "./components/GamePlay";
import BlockItem from "./components/BlockItem.vue";

const newGame = new GamePlay(10, 10);
const { blocks } = toRefs(newGame.blockState);
watchEffect(() => newGame.watchGameState());
</script>

<template>
  <div class="mines-sweeper">
    <div v-for="raw of blocks" class="raw">
      <template v-for="block of raw">
        <BlockItem
          :block="block"
          @click="newGame.leftClickBlock(block)"
          @click.right.prevent="newGame.rightClickBlock(block)"
        />
      </template>
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
    background-color: rgba(107, 114, 128, 0.1);
    &:hover {
      background-color: rgba(107, 114, 128, 0.2);
    }
    > div {
      width: 100%;
      height: 100%;
    }
    .flag {
      background: url("https://api.iconify.design/ph:flag-checkered-fill.svg?color=%2339aec6")
        no-repeat center center / contain;
    }
    .bomb {
      background: url("https://api.iconify.design/noto:bomb.svg?color=%23cc4f33")
        no-repeat center center / contain;
    }
  }
}
</style>
