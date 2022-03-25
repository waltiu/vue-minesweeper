<script setup>
import { defineProps } from "vue";
import { isDev } from "./constant";

defineProps({
  block: {},
});

const getBlockStyles = (block) => {
  if (!block.isCovered) {
    return {
      color: "red",
    };
  }
  return {
    color: "gray",
  };
};
</script>
<template>
  <div class="block" :style="getBlockStyles(block)">
    <template v-if="block.flag">
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
<style></style>
