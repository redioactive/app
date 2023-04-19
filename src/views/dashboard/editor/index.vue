<script lang="ts" setup>
import { onMounted } from "vue";
import { useHomeStore } from "@/store/modules/home";
import { useRouter } from "vue-router";
import { useAuditTable } from "@/hooks/useStatus";

const { pendingData, failedData, passData } = useAuditTable();
const router = useRouter();
const ToDetail: (id: any) => void = (row: any) => {
  router.push({
    name: "detail",
    params: {
      id: 0,
      authstatus: "待审核",
    },
  });
};
/** 用户信息数据 */
const HomeStore = useHomeStore();
const Info = HomeStore.Homevalues.items;
onMounted(async () => {
  HomeStore.getHomeInfo();
});
</script>
<template>
  <div>
    <!-- top -->
    <div class="main">
      <h3>快速查看</h3>
      <!-- HomeList -->
      <ul class="nav">
        <li>
          <el-icon><WarningFilled /></el-icon>
          <p>一个商品待审核</p>
          <el-button plain>立即处理</el-button>
        </li>
        <li>
          <el-icon><WarningFilled /></el-icon>
          <p>{{ pendingData.length }}个商铺待审核</p>
          <el-button @click="ToDetail" plain>立即处理</el-button>
        </li>
        <li>
          <el-icon><WarningFilled /></el-icon>
          <p>一个提现待审核</p>
          <el-button plain>立即处理</el-button>
        </li>
        <li>
          <el-icon><WarningFilled /></el-icon>
          <p>一个套餐已售罄，已自动下架</p>
          <el-button plain>立即处理</el-button>
        </li>
      </ul>
      <!-- userInfo -->
      <ul class="userInfo">
        <li :class="`item${item.id}`" v-for="item in Info" :key="item.id">
          <el-icon> <component :is="item.icon" /> </el-icon>
          <p>
            <span v-for="text in item.texts" :key="text">{{ text }}</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
.el-icon {
  margin-top: 3px;
  font-size: 15px;
}
.el-button:hover {
  border: none;
}
.main {
  display: grid;
  max-width: 75rem;
  grid-template-rows: 3.5714rem 21.4286rem auto;
  grid-template-columns: repeat(1, 100%);
  margin: 0 10px;
  h3 {
    min-width: 1024px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    text-align: center;
  }
  .nav {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    justify-items: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
    font-size: 12px;
    .el-button {
      width: 4.6429rem;
    }
    li {
      text-align: center;
      width: 50%;
      height: 50%;
      float: left;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
      p {
        overflow: hidden;
      }
      &:nth-child(-n + 3):nth-child(n + 1) {
        .el-icon {
          color: #e34d59;
        }
        .el-button {
          background-color: #e34d59;
          color: #fff;
        }
      }
      &:nth-child(n + 4) {
        .el-button {
          background-color: #666666;
          color: #fff;
        }
      }
      .el-icon {
        margin: 6px 0;
      }
      p {
        margin: 5px 0;
      }
      .el-button {
        width: 4.6429rem;
        height: 25px;
        margin: 5px 0;
      }
    }
  }
  @media (max-width: 600px) {
    h3 {
      min-width: 100px !important;
    }
    .nav {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      li {
        width: 65%;
        height: 85%;
      }
    }
    .userInfo {
      position: relative;
      display: grid;
      grid-template-columns: 1fr 1fr !important;
      grid-auto-flow: row dense;
      justify-content: stretch;
      .item6,
      .item5 {
        grid-column: 4/2;
        grid-row: 4;
        position: absolute;
        top: 20px;
        left: -175px;
        width: 180px;
      }
      .item6 {
        position: absolute;
        top: -102px;
        right: 0;
        left: 17px;
        width: 173px;
      }
      .item7 {
        margin: 0 0 8px 8px;
        width: 173px;
      }
    }
  }

  .userInfo {
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    margin-top: 30px;
    li {
      text-align: center;
      overflow: hidden;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
      p {
        display: grid;
        justify-items: auto 0;
        span {
          margin: 3px 5px;
        }
      }
    }
    .el-icon {
      font-size: 18px;
      border-radius: 50%;
      color: #fff;
    }
    .item1,
    .item2,
    .item3,
    .item4,
    .item5,
    .item6,
    .item7 {
      p {
        text-align: left;
        font-size: 12px;
        margin: 0.2857rem 10px;
      }
    }
    .item1 {
      grid-row: 1 / 2;
      grid-column: 1 / -1;

      .el-icon {
        background: #0034b5;
      }
    }

    .item2 {
      grid-row: 2 / 3;
      grid-column: 1 / 3;
      margin: 30px 0;
      .el-icon {
        background: #00a870;
      }
    }

    .item3 {
      grid-row: 2 / 3;
      grid-column: 3 / -1;
      margin: 30px 0;
      .el-icon {
        background: #e78739;
      }
    }

    .item4 {
      .el-icon {
        background: #0052d9;
      }
    }
    .item5 {
      .el-icon {
        background: #00a870;
      }
    }
    .item6 {
      .el-icon {
        background: #f5ba18;
      }
    }
    .item7 {
      .el-icon {
        background: #e37318;
      }
    }
  }
}
</style>
