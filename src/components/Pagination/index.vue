<template>
  <div>
    <el-pagination
      background
      :layout="layout"
      v-model="current_page"
      :page-sizes="pageSizes"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
type Props = {
  layout?: string;
  current_page?: number;
  pageSizes?: number[];
  total?: number;
};
const propData = withDefaults(defineProps<Props>(), {
  layout: "prev, pager, next",
  current_page: 1,
  page_sizes: () => [5, 15, 20, 25, 30, 35],
  total: 0,
});
const { current_page } = toRefs(propData);

const emit = defineEmits(["currentChange"]);

const handleCurrentChange = (val: number) => {
  emit("currentChange", val);
};
</script>
