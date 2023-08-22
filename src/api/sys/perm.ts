import { defHttp } from '/@/utils/http/axios';
import { PermDTO } from '/@/api/sys/model/permModel';

enum Api {
  PermList = '/perm/list',
}

export const getPermList = () => defHttp.get<PermDTO>({ url: Api.PermList });
