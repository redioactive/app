<script lang="ts" setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const phone = route.params.phone as string;
const name = route.params.name as string;
const status = route.params.status as string;
const state = route.params.state as string;
</script>
<template>
  <div>
    <ul>
      <li>
        <span>商户</span>
        <span>{{ phone }}</span>
      </li>
      <li>
        <span>店铺名称</span>
        <span>{{ name }}</span>
      </li>
      <li>
        <span>商铺性质</span>
        <span>{{ status }}</span>
      </li>
      <li>
        <span>商铺类型</span>
        <span>{{ state }}</span>
      </li>
    </ul>
  </div>
</template>
<style scoped lang="scss"></style>
