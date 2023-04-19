<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
import Isverify from "@/views/audit-center/components/Isverify/index.vue";
import ShopInfo from "./components/ShopInfo/index.vue";
import qualification from "./components/qualification/index.vue";
import decoration from "@/views/audit-center/components/decoration/index.vue";
const route = useRoute();
const authstatus = route.params.authstatus as string;
const modules = route.params.modules as string;

const success = () => {
  ElMessageBox.confirm("请再次确定无误", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "info",
  }).then(() => {
    ElMessage({
      type: "success",
      message: "更改成功",
    });
  });
};

const faild = () => {
  ElMessageBox.prompt("请输入修改建议", {
    confirmButtonText: "确认不通过",
    cancelButtonText: "取消",
    inputType: "textarea",
    inputPattern:
      /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: "修改提示:xxx",
  }).then(({ value }) => {
    ElMessage({
      type: "warning",
      message: `建议修改:${value}`,
    });
  });
  /** 设置延迟函数，再ELMessBox.prompt被调用之后，再执行css代码 */
  setTimeout(() => {
    const textarea = document.querySelector(
      ".el-message-box__input textarea"
    ) as HTMLTextAreaElement;

    if (textarea) {
      textarea.style.resize = "none";
    }
  }, 0);
};
</script>
<template>
  <div>
    <Isverify :status="authstatus" />
    <ShopInfo v-if="modules === '商铺信息'" />
    <qualification v-if="modules === '证件资质'" />
    <decoration v-if="modules === '商铺装修'" />
    <div class="Sentence">
      <div class="Hint">
        <el-icon><WarningFilled /></el-icon>
        <span
          >注意:
          审核一旦通过/不通过后,状态会实时更新至商家端,无法再次修改审核结果!</span
        >
      </div>
      <div class="btn">
        <el-button text @click="success" type="success">审核通过</el-button>
        <el-button text @click="faild" type="danger">审核不通过</el-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@media (max-width: 600px) {
}
.Sentence {
  margin: 20px 40px;
  display: grid;
  grid-template-rows: repeat(2, 100%);
  gap: 20px;
  .Hint {
    height: 45px;
    width: 60%;
    background-color: #f9e0c7;
    font-size: 12px;
    padding: 0 14px;
    border-radius: 3px;
    white-space: normal;
    .el-icon {
      color: red;
      font-size: 14px;
    }
    span {
      display: inline-block;
      margin: 3px 4px;
      margin-top: 17px;
    }
  }
  .btn {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    .el-button {
      margin: 0 30px;
    }
    .el-button--danger {
      border: 2px solid #f56c6c;
      background-color: #fff;
      &:hover {
        background-color: #f56c6c;
        color: #fff;
      }
      &:active {
        background-color: #fff;
      }
    }
    .el-button--success {
      border: 2px solid #95d475;
      background-color: #fff;
      &:hover {
        background-color: #95d475;
        color: #fff;
      }
      &:active {
        background-color: #fff;
      }
    }
  }
  .el-textarea textarea {
    resize: none;
  }
}
</style>
