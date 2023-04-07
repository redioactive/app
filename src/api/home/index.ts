import { request } from "@/utils/service"
import * as Home from "./types/home"

/** 登录落地页 */
export function getHomeDataApi() {
  return request<Home.HomeDataResponseData>({
    url: '/homeList',
    method: 'get',
  })
}

