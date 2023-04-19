import { request } from "@/utils/service"
import * as Home from "./types/home"

/** 用户信息 */
export async function getHomeInfoApi() {
  const response = await request<Home.HomeInfoResponseData>({
    url: "HomeInfo",
    method:"get",
  })
  return response;
}