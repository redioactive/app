<script lang="ts" setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const phone = route.params.phone as string;
const name = route.params.name as string;
const status = route.params.status as string;
const state = route.params.state as string;

const showViewer = ref(true);
const onPreview = () => {
  showViewer.value = true;
};
const closeViewer = () => {
  showViewer.value = false;
};

const selectedImageIndex = ref(0);

const selectImg = (index: number) => {
  selectedImageIndex.value = index;
  showViewer.value = true;
};

const srcList = [
  "https://cdn.pixabay.com/photo/2013/07/25/01/31/forest-166733_960_720.jpg",
  "https://cdn.pixabay.com/photo/2018/08/12/15/29/hintersee-3601004_960_720.jpg ",
  "https://cdn.pixabay.com/photo/2015/03/28/16/40/lake-696098_960_720.jpg",
  "https://cdn.pixabay.com/photo/2014/07/28/20/39/sunset-404072_1280.jpg",
  "https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg",
  "https://cdn.pixabay.com/photo/2017/09/18/15/38/moon-2762111_960_720.jpg",
];
</script>
<template>
  <div>
    <div class="qualification">
      <h3>证件资质</h3>
      <ul>
        <li>
          <span>商户</span>
          <span>{{ phone }}</span>
        </li>
        <li>
          <span>商铺名称</span>
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
          <span>证件照片</span>
          <div class="preview">
            <el-image
              v-for="(image, index) in srcList"
              :key="image"
              style="width: 220px; height: 155px"
              :src="image"
              :preview-src-list="srcList"
              @click="($event:MouseEvent) => { $event.stopPropagation(); selectImg(index); }"
              v-if="showViewer"
              @close="closeViewer"
              :url-list="srcList"
              :initial-index="selectedImageIndex"
            />
            <button @click="onPreview">点击查看大图</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
@media (max-width: 600px) {
  li {
    grid-template-columns: repeat(2, 25%) !important;
  }
}
.qualification {
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
    white-space: nowrap;

    &:nth-child(5) {
      button {
        width: 75px;
        margin-top: 10px;
        border: none;
        background: none;
        color: lightseagreen;
        cursor: pointer;
      }
    }

    .preview {
      display: grid;
      grid-template-columns: repeat(3, 100%);
      grid-template-rows: repeat(2, 50%);
      gap: 0 110px;
    }
  }
}
</style>
