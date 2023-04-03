<script lang="ts" setup>
import { getHomeInfo } from "@/api/home";
import { useHomeStore } from "@/store/modules/home";
useHomeStore();
</script>
<template>
  <div class="main">
    <h3>快速查看</h3>
    <div class="nav">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </div>
    <div class="last">
      <div class="user_numbers">
        <li>1</li>
      </div>
      <div class="sell">
        <li>2</li>
        <li>3</li>
      </div>
      <div class="synthesize">
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
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
    li {
      text-align: center;
      float: left;
      width: 60%;
      height: 50%;
      box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
    }
  }
  .last {
    width: 100%;
    display: grid;
    grid-template-rows: repeat(3, 33.33%);
    height: 28.5714rem;
    li {
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
    }
    .user_numbers {
      display: grid;
      grid-template-columns: repeat(1, 100%);
      grid-template-rows: repeat(1, 100%);
      li {
        place-self: center;
        width: 20%;
        height: 55%;
      }
    }
    .sell {
      display: grid;
      grid-template-columns: repeat(2, 50%);
      grid-template-rows: repeat(1, 100%);
      justify-content: space-evenly;
      justify-items: center;
      li {
        width: 35%;
        height: 60%;
      }
    }
    .synthesize {
      display: grid;
      grid-template-rows: repeat(1, 100%);
      grid-template-columns: repeat(4, 20%);
      justify-content: space-around;
      li {
        width: 95%;
        height: 50%;
      }
    }
  }
}
</style>
