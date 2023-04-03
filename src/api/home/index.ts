import { request } from '@/utils/service'

import * as Home from './type/home';

// 快速查看信息
export function getHomeInfo() {
  return request<Home.HomeResponseData>({
    url: 'home/quickLook',
    method : 'get'
  })
}