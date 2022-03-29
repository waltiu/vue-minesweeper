<script setup>
import { toRefs, watchEffect } from "vue";
import { GamePlay } from "./components/GamePlay";
import BlockItem from "./components/BlockItem.vue";
import { X_Length,Y_Length } from "./components/constant";
const newGame = new GamePlay(X_Length,Y_Length);
const { blocks,bombs } = toRefs(newGame.blockState);
watchEffect(() => newGame.watchGameState());
</script>


<template>
  <div class="mines-sweeper">
    <div class="oper">
      <div @click="newGame.start()">
      <button>
        reset
      </button></div>
      <div>炸弹数:{{bombs}}</div>
    </div>

    <div class="mine">
      <div v-for="raw of blocks" class="raw">
        <template v-for="block of raw">
          <BlockItem
            :block="block"
            @click="newGame.leftClickBlock(block)"
            @click.right.prevent="newGame.rightClickBlock(block)"
            @dblclick="newGame.rightClickBlock(block)"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.mines-sweeper {
  width: 100%;

  .oper {
    width: 100%;
    text-align: center;
    margin-bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    >div{
      margin-right: 24px;
    }
  }
  .mine {
    overflow: auto;
    width: 100%;

    .raw {
      display: flex;
      justify-content: center;
      display: flex;
      align-items: center;
    }
  }
}
</style>
