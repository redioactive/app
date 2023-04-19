import { useAuditStore } from "@/store/modules/audit";
import { computed } from 'vue';

export function useAuditTable() {
  const table = useAuditStore();
  const tableData = table.AuthData.TableData;

  const pendingData = computed(() => {
    return tableData.filter((item) => item.authstate === "待审核");
  });

  const failedData = computed(() => {
    return tableData.filter((item) => item.authstate === '审核不通过');
  });

  const passData = computed(() => {
    return tableData.filter((item) => item.authstate === '审核通过');
  });

  const ShopInfo = computed(() => {
    return tableData.filter((item) => item.modules === '商铺信息');
  })
  const qualification = computed(() => {
    return tableData.filter((item) => item.modules === '证件资质');
  })
  const ShopDecoration = computed(() => {
    return tableData.filter((item)=>item.modules === '商铺装修')
  })
  return {
    pendingData,
    failedData,
    passData,
    ShopInfo,
    qualification,
    ShopDecoration
  };
}