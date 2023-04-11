<template>
  <div :class="{ hidden: hidden }" class="pagination-container scrollBar">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!--       :page-sizes="pageSizes" -->
  </div>
</template>

<script lang="ts">
import { nextTick, Prop } from "vue";
import { defineComponent, computed } from "vue";
interface Props {
  total: number;
  page: number;
  limit: number;
  pageSizes: Array<any>;
  layout: string;
  background: boolean;
  autoScroll: boolean;
  hidden: boolean;
}
export default defineComponent({
  name: "Pagination",
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper",
    },
    background: {
      type: Boolean,
      default: false,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: Props, { emit }) {
    const currentPage: any = computed({
      get() {
        return props.page;
      },
      set(val) {
        emit("update:page", val);
      },
    });

    const pageSize: any = computed({
      get() {
        return props.limit;
      },
      set(val) {
        emit("update:limit", val);
      },
    });

    const handleSizeChange = (val: number) => {
      emit("pagination", { page: currentPage, limit: val });
    };

    const handleCurrentChange = (val: number) => {
      nextTick(() => {
        emit("pagination", { page: val, limit: pageSize });
      });
    };
    return {
      currentPage,
      pageSize,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped lang="scss">
.pagination-container {
  width: 100%;
  overflow-x: auto;
  background: #fff;
  padding: 16px 16px 0;
  .el-pagination {
    text-align: right;
  }
}

.pagination-container.hidden {
  display: none;
}
</style>
