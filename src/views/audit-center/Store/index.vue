<script lang="ts" setup>
import { useAuditStore } from "@/store/modules/audit";
import { onMounted } from "vue";
import Pagination from "@/components/Navigation/index.vue";
import { isNumber } from "element-plus/es/utils/types";
const table = useAuditStore();
const tableData = table.AuthData.TableData;

const columns = [
  { prop: "phone", label: "商户手机号", width: "105px" },
  { prop: "name", label: "姓名", width: "95px" },
  { prop: "status", label: "商铺性质" },
  { prop: "state", label: "商铺类型" },
  { prop: "submit", label: "新提交/更改" },
  { prop: "modules", label: "模块" },
  { prop: "authstate", label: "审核状态" },
  { prop: "date", label: "提交时间" },
  { prop: "authtime", label: "审核时间" },
  { prop: "authtcons", label: "审核耗时" },
  { prop: "operation", label: "操作" },
];
onMounted(() => {
  table.getAuthList();
});
</script>
<template>
  <div>
    <h3>商铺审核</h3>
    <div class="bar">
      <el-row :gutter="20">
        <el-col :span="24" :xs="24" :sm="24">
          <p>审核状态 :</p>
          <el-tabs type="card" class="demo-tabs">
            <el-tab-pane label="全部" name="1" />
            <el-tab-pane name="2">
              <template #label>
                <el-badge
                  value="3"
                  class="item"
                  style="position: absolute; top: -10px; left: 57px"
                >
                </el-badge>
                <span>已审核</span>
              </template>
            </el-tab-pane>
            <el-tab-pane label="审核不通过" name="3" />
            <el-tab-pane label="审核通过" name="4" />
          </el-tabs>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" :xs="24" :sm="24">
          <p>模块 :</p>
          <el-tabs type="card" class="demo-tabs">
            <el-tab-pane label="全部" name="5" />
            <el-tab-pane label="门店信息" name="6" />
            <el-tab-pane label="证件资质" name="7" />
            <el-tab-pane label="门店装修" name="8" />
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <div class="download">
      <div class="style">
        <el-icon><Download /></el-icon>
        <p>下载列表</p>
      </div>
    </div>
    <div class="table">
      <el-table border style="width: 100%" stripe :data="tableData">
        <el-table-column
          v-for="column in columns"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :width="column.width"
        />
      </el-table>
    </div>
    <div class="sorter">
      <div>一共101跳数据</div>

      <el-pagination
        background
        small
        layout="prev, pager, next"
        :total="1000"
      />
    </div>
  </div>
</template>
<style scoped lang="scss">
h3 {
  margin: 20px 0 0 20px;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
}

@media screen and (max-width: 480px) {
  h3 {
    margin: 0;
  }
}
.bar {
  margin: 20px;
  display: grid;
  grid-template-rows: repeat(2, 70%);
  .el-tabs {
    --el-tabs-header-height: 30px;
  }
  ::v-deep .el-tabs__nav-scroll {
    overflow: visible;
  }
  ::v-deep .el-tabs--card > .el-tabs__header .el-tabs__item {
    font-size: 12px;
  }
  .el-table .cell div {
    text-align: center;
  }
  ::v-deep .el-table__row .el-table__cell .cell {
    text-align: center;
  }
  ::v-deep .el-tabs--card > .el-tabs__header {
    width: 364px;
  }
  ::v-deep .is-guttered {
    display: grid;
    grid-template-rows: repeat(2, 50%);
    grid-template-columns: 8% 20%;
    font-size: 12px;
  }
  ::v-deep .el-tabs__nav {
    font-size: 12px;
  }
  ::v-deep .el-tabs__nav-wrap {
    overflow: visible;
  }
  ::v-deep .el-tabs__nav-scroll {
    overflow: visible;
  }
  p {
    font-size: 14px;
    color: lightseagreen;
    margin: 10px 0;
  }
}
.download {
  display: grid;
  font-size: 14px;
  margin-right: 40px;
  justify-content: flex-end;
  .style {
    display: grid;
    grid-template-columns: 18px 77px;
    align-items: center;
    background-color: #bcebdc;
    border-radius: 5%;
    cursor: pointer;
    .el-icon {
      margin-left: 5px;
    }
    &:hover {
      color: lightseagreen;
    }
    p {
      padding: 6px 3px;
    }
  }
}
.table {
  margin: 20px;
  display: grid;
  margin-top: 15px;
  cursor: pointer;

  ::v-deep .el-table th {
    background-color: #ecf2fe;
    color: #93969e;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    padding: 15px 0;
  }
  ::v-deep .el-table td.el-table__cell div {
    text-align: center;
  }
  ::v-deep .el-table tr {
    font-size: 12px;
    &:hover {
      background: none;
    }
  }
  ::v-deep .el-table td {
    padding: 20px 0;
  }
  ::v-deep .el-table--striped .el-table__body tr.el-table__row--striped td {
    color: #fff;
    background-color: skyblue;
  }
}
.sorter {
  display: grid;
  grid-template-rows: repeat(1, 100%);
  grid-template-columns: repeat(2, 50%);
  margin: 150px 20px;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  div {
    justify-content: flex-start;
    line-height: 20px;
  }
  ::v-deep.sorter div {
    justify-content: flex-end;
  }
}
</style>
