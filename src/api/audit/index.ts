import { request } from "@/utils/service";

import * as  Auth from './types/auth';

export async function getAuthDataApi() {
  const response = await request<Auth.AuthDataRespnseData>({
    url: "AuthShop",
    method: 'get'
  });
  return response;
}

