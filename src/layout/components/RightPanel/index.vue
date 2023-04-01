<script lang="ts" setup>
import { ref } from "vue";
const show = ref(false);
</script>

<template>
  <el-drawer v-model="show" size="300px" :with-header="false">
    <slot />
  </el-drawer>
</template>

<style lang="scss" scoped></style>
