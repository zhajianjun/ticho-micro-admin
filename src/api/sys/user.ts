import { defHttp } from '/@/utils/http/axios';
import { UserQuery, UserRoleMenuDtlDTO } from './model/userModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { LoginRequest, Oauth2AccessToken } from '/@/api/sys/model/loginModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/oauth/token',
  Logout = '/logout',
  GetUserInfo = '/user/getUserDtl',
  UserInfo = '/user',
  DelUserBatch = '/user/removeByIds',
  UserPage = '/user/page',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginRequest, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<Oauth2AccessToken>(
    {
      url: Api.Login,
      headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function getUserInfo(params?: any) {
  return defHttp.get<UserRoleMenuDtlDTO>(
    { url: Api.GetUserInfo, params },
    { errorMessageMode: 'none' },
  );
}

export function userPage(params?: UserQuery) {
  return defHttp.get<UserRoleMenuDtlDTO>(
    { url: Api.UserPage, params },
    { errorMessageMode: 'none' },
  );
}

export function saveUser(params: any) {
  return defHttp.post<any>({ url: Api.UserInfo, params }, { errorMessageMode: 'message' });
}

export function delUser(params: string) {
  return defHttp.delete<any>(
    { url: Api.UserInfo + '?id=', params },
    { errorMessageMode: 'message' },
  );
}

export function delUserBatch(params: string) {
  return defHttp.delete<any>(
    { url: Api.DelUserBatch + '?ids=', params },
    { errorMessageMode: 'message' },
  );
}

export function modifyUser(params: any) {
  return defHttp.put<any>({ url: Api.UserInfo, params }, { errorMessageMode: 'message' });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
