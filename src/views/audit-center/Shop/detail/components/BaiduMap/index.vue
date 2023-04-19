<template>
  <div class="all">
    <!-- <el-input v-model="input" placeholder="输入地址" /> -->
    <!-- <el-input v-model="address" @blur="onInputBlur" placeholder="输入地址" /> -->
    <div id="allmap"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
let map: any = null;
const address = ref("");
onMounted(() => {
  loadMapScript();
  // 加载百度地图资源
});
// 初始化地图
const init = () => {
  const { BMap } = window as any;
  // 注意要带window，不然会报错（注意官方api,会有改动，之前是Bmap,后面3.0版本改为了BMap,最好查文档或者打印一下window）
  map = new BMap.Map("allmap");
  // allmap必须和dom上的id一直
  map.centerAndZoom(new BMap.Point(104.05740358713781, 30.697356042874134), 11);
  // 初始化地图,设置中心点坐标和地图级别
  map.setCurrentCity("成都");
  map.enableScrollWheelZoom(true);
};
const loadMapScript = () => {
  // 此处在所需页面引入资源就是，不用再public/index.html中引入
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.className = "loadmap";
  // 给script一个类名
  script.src =
    "https://api.map.baidu.com/getscript?v=3.0&ak=shCxSi8l1KPVEunYDE58dYh1K2ZOvHDG";
  // 此处需要注意：申请ak时，一定要应用类别一定要选浏览器端，不能选服务端，不然地图会报ak无效
  script.onload = () => {
    // 使用script.onload，待资源加载完成，再初始化地图
    init();
  };
  let loadmap = document.getElementsByClassName("loadmap");
  if (loadmap) {
    // 每次append script之前判断一下，避免重复添加script资源标签
    for (let i = 0; i < loadmap.length; i++) {
      document.body.removeChild(loadmap[i]);
    }
  }
  document.body.appendChild(script);
};
</script>

<style scoped lang="scss">
#allmap {
  width: 100%;
  height: 100%;
  :deep(.anchorBL) {
    display: none !important;
  }
}
.el-input {
  width: 50%;
  margin: 0 0 10px 0;
}
</style>
