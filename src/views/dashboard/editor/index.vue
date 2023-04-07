<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useHomeStore } from "@/store/modules/home";

const homeStore = useHomeStore();
const homeList = homeStore.HomeList;

/** 监听屏幕的变化响应式数据 */
const windowWidth = ref(window.innerWidth);
const rootValue = ref([]);
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};
/** 监听一下nav，如果屏幕有变化，元素宽高变化 */
watch(windowWidth, (newWidth) => {
  rootValue.value.forEach((box) => {
    if (newWidth <= 390 || newWidth <= 450 || newWidth < 900) {
      if (box !== null) {
        (box as HTMLElement).style.width = "85%";
        (box as HTMLElement).style.height = "70%";
      }
    } else {
      if (box !== null) {
        (box as HTMLElement).style.width = "55%";
        (box as HTMLElement).style.height = "60%";
      }
    }
  });
});

onMounted(() => {
  window.addEventListener("resize", handleResize);
  homeStore.getHomeList();
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
<template>
  <!-- top -->
  <div class="main">
    <h3>快速查看</h3>
    <div class="nav" v-if="homeList">
      <li ref="rootValue" v-for="item in homeList.items" :index="item.id">
        <el-icon :color="item.color"><WarningFilled /></el-icon>
        <p>{{ item.text }}</p>
        <el-button :type="item.buttonType">{{ item.buttonText }}</el-button>
      </li>
    </div>
    <p v-else>加载中...</p>
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
  grid-template-rows: 50px 300px auto;
  grid-template-columns: repeat(1, 100%);
  margin: 0 10px;
  h3 {
    min-width: 300px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    text-align: center;
  }
  .nav {
    display: grid;
    grid-template-columns: repeat(3, 30%);
    grid-template-rows: repeat(2, 50%);
    justify-content: space-evenly;
    justify-items: center;
    align-items: center;
    border-bottom: 1px solid #ccc;
    font-size: 12px;
    li {
      text-align: center;
      float: left;
      width: 65%;
      height: 55%;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
      .el-icon {
        margin: 6px 0;
      }
      p {
        margin: 5px 0;
      }
      .el-button {
        width: 5rem;
        height: 25px;
        margin: 5px 0;
      }
    }
  }
}
</style>
