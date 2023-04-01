<script lang="ts" setup></script>
<template>
  <div class="container">
    <div class="top">
      <h3>快速查看</h3>
    </div>
    <div class="center">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
    </div>
    <div class="last"></div>
  </div>
</template>
<style scoped lang="less">
.container {
  position: relative;
  display: grid;
  grid-template-columns: repeat(1, 100%);
  grid-template-rows: repeat(3, 33%);
  width: 100%;
  .top {
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .center {
    height: 300px;
    border-bottom: 1px solid #ccc;
    div {
      float: left;
      width: 100px;
      height: 100px;
      background-color: skyblue;
      margin-left: 10px;
    }
  }
  .underline {
    position: absolute;
    left: 10px;
    display: inline-block;
    width: 95%;
    height: 1px;
    background-color: #000;
  }
}
</style>
