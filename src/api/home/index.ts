import { request } from "@/utils/service"
import * as Home from "./types/home"

/** 登录落地页 */
export async function getHomeDataApi() {
  const response = await request<Home.HomeDataResponseData>({
    url: 'HomeList',
    method: 'get',
  });
  return response;
}
/** 用户信息 */
export async function getHomeInfoApi() {
  const response = await request<Home.HomeInfoResponseData>({
    url: "HomeInfo",
    method:"get",
  })
  return response;
}