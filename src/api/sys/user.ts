import { defHttp } from '/@/utils/http/axios';
import { UserRoleMenuDtlDTO } from './model/userModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { LoginRequest, Oauth2AccessToken } from '/@/api/sys/model/loginModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/oauth/token',
  Logout = '/logout',
  GetUserInfo = '/user/getUserDtl',
  GetPermCode = '/getPermCode',
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

/**
 * @description: getUserInfo
 */
export function getUserInfo(params?: any) {
  return defHttp.get<UserRoleMenuDtlDTO>(
    { url: Api.GetUserInfo, params },
    { errorMessageMode: 'none' },
  );
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
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
