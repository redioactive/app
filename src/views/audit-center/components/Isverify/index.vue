<script lang="ts" setup>
import { CircleCheck, CircleClose, MoreFilled } from "@element-plus/icons-vue";

import { computed } from "vue";
const props = defineProps({
  status: String,
});
const Step = computed(() => {
  switch (props.status) {
    case "待审核":
      return {
        title: "待审核",
        description: "",
        icon: MoreFilled,
        status: "wait",
      };
    case "审核通过":
      return {
        title: "审核通过",
        description: "",
        icon: CircleCheck,
        status: "success",
      };
    case "审核不通过":
      return {
        title: "审核不通过",
        description: "",
        icon: CircleClose,
        status: "error",
      };
    default:
      return {
        title: "",
        description: "",
        icon: "",
        status: "",
      };
  }
});
</script>
<template>
  <div>
    <el-steps :active="3" :space="0">
      <el-step
        title="提交审核"
        description="2023-01-02-22:00"
        :icon="CircleCheck"
      />
      <el-step title="平台审核中" description="变更" />
      <el-step
        :title="Step.title"
        :description="Step.description"
        :icon="Step.icon"
        :status="Step.status"
      />
    </el-steps>
  </div>
</template>
<style scoped lang="scss">
@media (max-width: 600px) {
}
:deep(.el-step) {
  flex-basis: 35% !important;
}
:deep(.el-steps) {
  margin: 40px;
  font-size: 12px;
}
:deep(.el-step__title.is-finish) {
  font-size: 12px;
  font-weight: 600;
}
:deep(.el-step__title.is-process) {
  font-size: 12px;
  font-weight: 600;
}
:deep(.el-step__title.is-error) {
  font-weight: 600;
  font-size: 12px;
}

:deep(.el-step__icon) {
  background: #fff;
}
:deep(.el-step__icon-inner[class*="el-icon"]:not(.is-status)) {
  font-size: 25px;
}
:deep(.el-step__icon.is-text) {
  border-color: #0052d9;
  color: #fff;
  background-color: #0052d9;
}
:deep(.el-step__head) {
  width: 100%;
}
:deep(.el-step__head) {
  width: 95%;
}
:deep(.el-step.is-horizontal .el-step__line) {
  left: 40px;
}
</style>
