import { defHttp } from '/@/utils/http/axios';
import { RoleDTO } from '/@/api/sys/model/roleModel';

enum Api {
  Role = '/role',
  RolePage = '/role/page',
}

export function rolePage(params?: RoleDTO) {
  return defHttp.get<RoleDTO>({ url: Api.RolePage, params }, { errorMessageMode: 'none' });
}

export function saveRole(params: any) {
  return defHttp.post<any>({ url: Api.Role, params }, { errorMessageMode: 'message' });
}

export function delRole(params: string) {
  return defHttp.delete<any>({ url: Api.Role + '?id=', params }, { errorMessageMode: 'message' });
}

export function modifyRole(params: any) {
  return defHttp.put<any>({ url: Api.Role, params }, { errorMessageMode: 'message' });
}
