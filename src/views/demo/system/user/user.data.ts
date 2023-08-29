// import { getAllRoleList, isAccountExist } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'username',
    width: 120,
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 180,
  },
  {
    title: '租户编号',
    dataIndex: 'tenantId',
    width: 180,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 200,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'mobile',
    label: '手机号',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const userFormSchema: FormSchema[] = [
  {
    field: `id`,
    component: 'Input',
    label: `编号`,
    show: false,
  },
  {
    field: `tenantId`,
    component: 'Input',
    label: `租户编号`,
    show: false,
  },
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      // {
      //   validator(_, value) {
      //     return new Promise((resolve, reject) => {
      //       isAccountExist(value)
      //         .then(() => resolve())
      //         .catch((err) => {
      //           reject(err.message || '验证失败');
      //         });
      //     });
      //   },
      // },
    ],
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    ifShow: ({ values }) => !values.id,
  },
  // {
  //   label: '角色',
  //   field: 'role',
  //   component: 'ApiSelect',
  //   componentProps: {
  //     api: getAllRoleList,
  //     labelField: 'roleName',
  //     valueField: 'roleValue',
  //   },
  //   required: true,
  // },
  {
    field: 'dept',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: false,
  },
  {
    field: 'nickname',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
