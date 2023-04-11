<script lang="ts" setup>
import { onMounted } from "vue";
import { useHomeStore } from "@/store/modules/home";

// HomeList
const HomeStore = useHomeStore();
const HomeList = HomeStore.HomeUser.HomeList;

/** 用户信息数据 */
const Info = HomeStore.Homevalues.items;
onMounted(async () => {
  HomeStore.getHomeList();
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
        <li v-for="user in HomeList" :key="user.id">
          <el-icon :color="user.color"><WarningFilled /></el-icon>
          <p>{{ user.text }}</p>
          <el-button :type="user.buttonType">{{ user.buttonText }}</el-button>
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
  background: none;
  color: #ff4500;
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
    .nav {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      li {
        width: 65%;
        height: 85%;
      }
    }
    .userInfo {
      .item4,
      .item5,
      .item6,
      .item7 {
        width: 4.6429rem;
        height: 4.5714rem;
      }
    }
  }
  @media (max-width: 300px) {
    .userInfo {
      .item4,
      .item5,
      .item6,
      .item7 {
        height: 1.4286rem;
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
