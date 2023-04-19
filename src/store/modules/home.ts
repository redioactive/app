import { defineStore } from 'pinia'
import { getHomeInfoApi } from "@/api/home";
import { HomeDataResponseData,HomeInfoResponseData  } from '@/api/home/types/home'

interface IHomeState {
  HomeUser: HomeDataResponseData;
  Homevalues: HomeInfoResponseData;
}
export const useHomeStore = defineStore('home', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: "HomeList",
        storage: localStorage
      }
    ]
  },
  state: ():IHomeState => ({
    HomeUser: {
      HomeList: [{
        id: 0,
        color: "",
        text: "",
        buttonType: "",
        buttonText:""
      }]
    },
    Homevalues: {
      code: 0,
      items: []
    }
  }),
  actions: {
   
    /** 获取用户信息Api */
    async getHomeInfo() {
      try { 
        const res = await getHomeInfoApi();
        this.Homevalues.items = res.items;
        return res;
      } catch (error) {
        console.log(error);
        throw error
      }
    }
  }
})
