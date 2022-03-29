<script setup>
import { defineProps } from "vue";
import { isDev, aroundBombNumberColors } from "./constant";

defineProps({
  block: {},
});

const getBlockStyles = (block) => {
  if (!block.isCovered) {
    return {
      color: aroundBombNumberColors[block.aroundBomb],
      backgroundColor: "#fff",
    };
  }
};
</script>
<template>
  <div class="block" :style="getBlockStyles(block)">
    <template v-if="block.flag&&block.isCovered">
      <div class="flag" />
    </template>
    <template v-else-if="!block.isCovered || isDev">
      <div v-if="block.isBomb" class="bomb" />
      <div v-else>
        {{ block.aroundBomb || "" }}
      </div>
    </template>
  </div>
</template>
<style lang="scss">
.block {
  cursor: pointer;
  margin: 2px;
  padding: 2px;
  border-radius: 2px;
  display: inline-block;
  width: 20px;
  height: 20px;
  text-align: center;
  background-color: rgba(107, 114, 128, 0.1);
  border: 1px solid rgba(156, 163, 175, 0.1);
  flex-shrink: 0;
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
</style>
