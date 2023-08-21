import { defHttp } from '/@/utils/http/axios';
import { MenuDtlDTO } from './model/menuModel';

enum Api {
  Menu = '/menu',
  MenuList = '/menu/list',
}

export const getMenuList = () => defHttp.get<MenuDtlDTO>({ url: Api.MenuList });

export function saveMenu(params: any) {
  return defHttp.post<MenuDtlDTO>({ url: Api.Menu, params }, { errorMessageMode: 'message' });
}

export function delMenu(params: string) {
  return defHttp.delete<any>({ url: Api.Menu + '?id=', params }, { errorMessageMode: 'message' });
}

export function modifyMenu(params: any) {
  return defHttp.put<MenuDtlDTO>({ url: Api.Menu, params }, { errorMessageMode: 'message' });
}
