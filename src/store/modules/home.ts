import { defineStore } from 'pinia'
import { getHomeDataApi } from "@/api/home";
import { HomeDataResponseData } from '@/api/home/types/home'
import { ref } from 'vue'
export const useHomeStore = defineStore('home', () => {
  const HomeList = ref<HomeDataResponseData | null>(null)
  const getHomeList = () => {
    return new Promise((resolve, reject) => {
      getHomeDataApi().then((res) => {
        HomeList.value = res;
        resolve(res)
      })
        .catch((error) => {
        reject(error)
      })
    })
  }
  return {HomeList,getHomeList}
})


