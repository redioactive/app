<script lang="ts" setup>
import { useRoute } from "vue-router";

const decoration = defineProps({
  modules: String,
});
const route = useRoute();

const phone = route.params.phone as string;
const name = route.params.name as string;
const status = route.params.status as string;
const state = route.params.state as string;
</script>
<template>
  <div>
    <div v-if="decoration" class="decoration">
      <h3>门店装修</h3>
    </div>
  </div>
</template>
<style scoped lang="scss"></style>
