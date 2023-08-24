import { defHttp } from '/@/utils/http/axios';
import { MenuDtlModule } from './model/menuModel';

enum Api {
  Menu = '/menu',
  MenuList = '/menu/list',
  Routes = '/menu/route',
}

export const getMenuList = () => defHttp.get<MenuDtlModule>({ url: Api.MenuList });

export const getRoutes = () => defHttp.get<MenuDtlModule>({ url: Api.Routes });

export function saveMenu(params: any) {
  return defHttp.post<MenuDtlModule>({ url: Api.Menu, params }, { errorMessageMode: 'message' });
}

export function delMenu(params: string) {
  return defHttp.delete<any>({ url: Api.Menu + '?id=', params }, { errorMessageMode: 'message' });
}

export function modifyMenu(params: any) {
  return defHttp.put<MenuDtlModule>({ url: Api.Menu, params }, { errorMessageMode: 'message' });
}
