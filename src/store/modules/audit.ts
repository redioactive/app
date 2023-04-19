import { defineStore } from 'pinia'
import { getAuthDataApi } from '@/api/audit';
import { AuthDataRespnseData } from '@/api/audit/types/auth';

interface IauthStore {
  AuthData:AuthDataRespnseData
}

export const useAuditStore = defineStore('audit', {
  persist: {
    enabled: true,
    strategies: [
      {
        key: "AuthList",
        storage:localStorage,
      }
    ]
  },
  state: (): IauthStore => ({
    AuthData: {
      TableData: [
        {
          id: 0,
          phone: 0,
          name: "",
          status: "",
          state: "",
          submit: '',
          modules: "",
          authstate: "",
          data: "",
          anthtime: '',
          authtcons: "",
          operation: "",
        }
      ]
    }
  }),
  actions: {
    async getAuthList() {
      try {
        const res = await getAuthDataApi();
        this.AuthData = res
        return res;
      } catch (error) {
        console.log(error);
        throw error
      }
    }
  }
})