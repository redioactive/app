<script lang="ts" setup>
import { useAuditStore } from "@/store/modules/audit";
import { onMounted, reactive, computed, ref } from "vue";
import Pagination from "@/components/Pagination/index.vue";
import { useRouter } from "vue-router";
import useDownLoad from "@/hooks/useDownload";
import { useAuditTable } from "@/hooks/useStatus";

// 获取table数据
const table = useAuditStore();
const tableData = table.AuthData.TableData;

// 路由跳转
const router = useRouter();
const ToDetail: (id: any) => void = (row) => {
  router.push({
    name: "detail",
    params: {
      id: row.id,
      authstatus: (row as any).authstate,
      phone: (row as any).phone,
      name: (row as any).name,
      status: (row as any).status,
      state: (row as any).state,
      modules: (row as any).modules,
    },
  });
};
/** Download */
const { down } = useDownLoad(tableData);
// 动态渲染authstate的样式
const getColor = (authstate: string) => {
  if (authstate === "待审核") {
    return "#4f88e5";
  } else if (authstate === "审核不通过") {
    return "#da5d56";
  } else if (authstate === "审核通过") {
    return "#40be94";
  }
};
defineExpose({ getColor });

/** 动态渲染审核状态 */
const dataType = ref("All");
const dataModules = ref("ModuleAll");
const ShowAllStatus = async (tab: any) => {
  dataType.value = tab.paneName;
};

const ShowModules = async (tab: any) => {
  dataModules.value = tab.paneName;
};
const allData = computed(() => {
  return tableData;
});
const {
  pendingData,
  failedData,
  passData,
  ShopInfo,
  qualification,
  ShopDecoration,
} = useAuditTable();

/**计算一共多少条数据*/
const dataCount = computed(() => {
  return tableData.length;
});
/** 和分页器的联动 */
const CustomData = computed(() => {
  let data;
  switch (dataType.value) {
    case "All":
      data = allData.value;
      break;
    case "Pendings":
      data = pendingData.value;
      break;
    case "failed":
      data = failedData.value;
      break;
    case "pass":
      data = passData.value;
      break;
    default:
      data = allData.value;
  }
  switch (dataModules.value) {
    case "ModuleAll":
      break;
    case "ShopInfo":
      data = data.filter((item) => item.modules === "商铺信息");
      break;
    case "qualification":
      data = data.filter((item) => item.modules === "证件资质");
      break;
    case "ShopDecoration":
      data = data.filter((item) => item.modules === "商铺装修");
      break;
  }
  // const start = (changePage.currentPage - 1) * changePage.pageSizes;
  // const end = start + changePage.pageSizes;
  // return data.slice(start, end);
  return data;
});
/** 当用户切换分页时，handleCurrentChange会被调用，并更新当前选中的页码以及获取新的数据。 */
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};
// 改变pagination的数据
const changePage = reactive({
  currentPage: 1,
  limit: 10,
  pageSizes: 3,
  pageSize: 3,
});

const currentPage = ref(1);
const pageSize = 3;

onMounted(() => {
  table.getAuthList();
});
</script>
<template>
  <div>
    <h3>商铺审核</h3>
    <div class="bar">
      <el-row :gutter="20">
        <el-col :span="24" :xs="102" :sm="24">
          <p>审核状态 :</p>
          <el-tabs type="card" class="demo-tabs" @tab-click="ShowAllStatus">
            <el-tab-pane label="全部" name="All" />
            <el-tab-pane name="Pendings">
              <template #label>
                <el-badge :value="pendingData.length"> </el-badge>
                <span>待审核</span>
              </template>
            </el-tab-pane>
            <el-tab-pane name="failed">
              <template #label>
                <el-badge :value="failedData.length"></el-badge>
                <span>审核失败</span>
              </template>
            </el-tab-pane>
            <el-tab-pane name="pass">
              <template #label>
                <el-badge :value="passData.length"></el-badge>
                <span>审核成功</span>
              </template>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" :xs="102" :sm="24">
          <p>模块 :</p>
          <el-tabs type="card" class="demo-tabs" @tab-click="ShowModules">
            <el-tab-pane label="全部" name="moduleAll" />
            <el-tab-pane name="ShopInfo">
              <template #label>
                <el-badge :value="ShopInfo.length"></el-badge>
                <span>门店信息</span>
              </template>
            </el-tab-pane>
            <el-tab-pane name="qualification">
              <template #label>
                <el-badge :value="qualification.length"></el-badge>
                <span>证件资质</span>
              </template>
            </el-tab-pane>
            <el-tab-pane name="ShopDecoration">
              <template #label>
                <el-badge :value="ShopDecoration.length"></el-badge>
                <span>商铺装修</span>
              </template>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </div>
    <div class="download">
      <div class="style" @click="down">
        <el-icon><Download /></el-icon>
        <span>下载列表</span>
      </div>
    </div>
    <div class="table">
      <el-table
        border
        :data="
          CustomData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
      >
        <el-table-column prop="phone" label="商户手机号" width="105px" />
        <el-table-column prop="name" label="商铺名称" width="95px" />
        <el-table-column prop="status" label="商铺性质" />
        <el-table-column prop="submit" label="新提交/更改"></el-table-column>
        <el-table-column prop="modules" label="模块"></el-table-column>
        <el-table-column prop="authstate" label="审核状态">
          <template #default="{ row }: ElTableColumn.ScopedSlot">
            <span :style="{ color: getColor(row.authstate) }">{{
              row.authstate
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="提交时间"></el-table-column>
        <el-table-column prop="authtime" label="审核时间"></el-table-column>
        <el-table-column prop="authtcons" label="审核耗时"></el-table-column>
        <el-table-column prop="operation" label="操作">
          <template #default="{ row }: ElTableColumn.ScopedSlot">
            <el-button @click="ToDetail(row)" size="small" plain>{{
              row.operation
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="sorter">
      <div>一共有{{ dataCount }}条数据</div>
      <Pagination
        @current-change="handleCurrentChange"
        :current-page="changePage.currentPage"
        :page-size="changePage.pageSizes"
        :total="CustomData.length"
      ></Pagination>
    </div>
  </div>
</template>
<style scoped lang="scss">
h3 {
  margin: 20px 0 0 20px;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
}

@media screen and (max-width: 600px) {
  h3 {
    margin: 0;
  }
  .bar {
    .is-guttered {
      display: grid !important;
      grid-template-columns: 20% auto !important;
      :deep(.el-tabs__item) {
        padding: 0 10px;
      }
      :deep(.el-badge) {
        position: absolute;
        top: -10px;
        left: 40px;
      }
    }
  }
  .sorter {
    :deep(.el-pager li) {
      --el-pagination-button-width: 22px;
      --el-pagination-button-height: 22px;
    }
  }
}
.bar {
  margin: 20px;
  display: grid;
  grid-template-rows: repeat(2, 70%);

  .el-tabs {
    --el-tabs-header-height: 30px;
  }
  :deep(.el-tabs--card > .el-tabs__header) {
    border: none;
  }
  :depp(.el-tabs__nav-scroll) {
    overflow: visible;
  }
  :deep(.el-badge) {
    position: absolute;
    top: -10px;
    left: 50px;
  }
  :deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
    font-size: 12px;
    border-bottom: 1px solid var(--el-border-color-light);
  }
  .el-table .cell div {
    text-align: center;
  }
  :deep(.el-table__row .el-table__cell .cell) {
    text-align: center;
  }
  :deep(.el-tabs--card > .el-tabs__header) {
    width: 364px;
  }
  .is-guttered {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 8% 92%;
    font-size: 12px;
  }
  :deep(.el-tabs__nav) {
    font-size: 12px;
  }
  :deep(.el-tabs__nav-wrap) {
    overflow: visible;
  }
  :deep(.el-tabs__nav-scroll) {
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
  &:hover {
    color: #409efd;
    transition: all 0.3s ease;
  }
  :deep(.el-button) {
    background-color: #bcebdc;
    border: none;
  }
  .style {
    display: grid;
    grid-template-columns: 18px 77px;
    align-items: center;
    background-color: #bcebdc;
    border-radius: 5%;
    cursor: pointer;
    span {
      margin: 5px 5px 5px 10px;
      font-size: 12px;
    }
    .el-icon {
      margin-left: 5px;
    }
  }
}
.table {
  margin: 20px;
  display: grid;
  margin-top: 15px;
  :deep(.el-table th) {
    background-color: #ecf2fe;
    color: #93969e;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    padding: 15px 0;
  }
  :deep(.el-table__empty-block) {
    background-color: lightseagreen;
  }
  :deep(.el-table__empty-text) {
    color: #fff;
  }
  :deep(.el-table td.el-table__cell div) {
    text-align: center;
  }
  :deep(.el-table tr) {
    font-size: 12px;
    &:hover {
      background: none;
    }
  }
  :deep(.el-table td) {
    padding: 20px 0;
  }
  :deep(.el-table .examine .cell) {
    color: skyblue;
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
  :deep(.el-pagination) {
    justify-content: flex-end;
  }
}
</style>
