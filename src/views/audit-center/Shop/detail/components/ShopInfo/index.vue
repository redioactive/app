<script lang="ts" setup>
import { ref } from "vue";
import BaiduMap from "../../../detail/components/BaiduMap/index.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const phone = route.params.phone as string;
const name = route.params.name as string;
const status = route.params.status as string;
const state = route.params.state as string;

const showViewer = ref(false);
const onPreview = () => {
  showViewer.value = true;
};
const closeViewer = () => {
  showViewer.value = false;
};
const url =
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg";
const srcList = [
  "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
];
</script>
<template>
  <div>
    <div class="ShopInfo">
      <h3>商铺信息</h3>
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
        <li>
          <span>商铺logo</span>
          <el-image
            style="width: 100px; height: 100px"
            ref="preview"
            :src="url"
            :preview-src-list="srcList"
          ></el-image>
          <el-image-viewer
            v-if="showViewer"
            @close="closeViewer"
            :url-list="srcList"
          ></el-image-viewer>
          <button @click="onPreview">点击查看大图</button>
        </li>
        <li>
          <span>商铺电话</span>
          <span>+86 {{ phone }}</span>
        </li>
        <li>
          <span>营业时间</span>
          <span
            >月份: 3-9月 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间:
            6:00&nbsp;-&nbsp;23:00</span
          >
        </li>
        <li>
          <span>商铺地址</span>
          <span>成都市金牛区</span>
        </li>
        <li>
          <span>定位地图</span>
          <BaiduMap />
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
@media (max-width: 600px) {
  .ShopInfo {
    li {
      grid-template-columns: repeat(2, 29%) !important;
      padding: 20px 0;
      gap: 30px;
      &:nth-child(5) {
        grid-template-columns: repeat(3, 20%) !important;
        button {
          left: 145px !important;
        }
      }
      &:nth-child(6) {
        span {
          white-space: nowrap;
        }
      }
      &:nth-child(7) {
        span {
          white-space: nowrap;
        }
      }
      &:nth-child(9) {
        display: grid;
        grid-template-columns: 20% 70% !important;
        grid-template-rows: 200px !important;
      }
    }
  }
  .Sentence {
    .Hint {
      width: 100% !important;
      span {
        margin: 0 !important;
      }
    }
  }
}
.ShopInfo {
  margin: 40px 40px 0 40px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 40px;
  h3 {
    margin: 20px 0;
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
  }
  li {
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 13%);
    padding: 10px 0;
    font-size: 12px;
    &:nth-child(5) {
      display: grid;
      grid-template-columns: repeat(3, 12%);
      button {
        position: absolute;
        left: 193px;
        line-height: 65px;
        background: none;
        border: none;
        color: #94b8f4;
        cursor: pointer;
      }
    }
    &:nth-child(7) {
      display: grid;
      grid-template-columns: 13% 35%;
    }
    &:nth-child(9) {
      display: grid;
      grid-template-columns: 13% 65%;
      grid-template-rows: 17.1429rem;
    }
  }
  :deep(.el-image__inner) {
    width: 50%;
    height: 50%;
    border-radius: 50%;
  }
  .el-image__preview {
    border-radius: 50%;
    width: 30px !important;
  }
  .demo-image__error .image-slot {
    font-size: 30px;
  }
  .demo-image__error .image-slot .el-icon {
    font-size: 30px;
  }
  .demo-image__error .el-image {
    width: 100%;
    height: 200px;
  }
}
</style>
