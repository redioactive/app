import store from '@/store';
import { defineStore } from 'pinia';


export const useHomeStore = defineStore("home", () => {
  
})

// 在setup外面使用
export function useHomeStoreHook() {
  return useHomeStore(store);
}