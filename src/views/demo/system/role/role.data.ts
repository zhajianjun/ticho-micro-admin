import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { modifyRoleStatus } from '/@/api/sys/role';

export const columns: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'id',
    width: 200,
    ifShow: false,
  },
  {
    title: '角色编码',
    dataIndex: 'code',
    width: 200,
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 180,
  },
  {
    title: '租户编号',
    dataIndex: 'tenantId',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          const params = { id: record.id, status: newStatus };
          modifyRoleStatus(params)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改角色状态`);
            })
            .catch(() => {
              createMessage.error('修改角色状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '备注',
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: `id`,
    component: 'Input',
    label: `编号`,
    show: false,
  },
  {
    field: 'code',
    label: '角色编码',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'name',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: `id`,
    component: 'Input',
    label: `编号`,
    show: false,
  },
  {
    field: 'code',
    label: '角色编码',
    required: true,
    component: 'Input',
  },
  {
    field: 'name',
    label: '角色名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
  },
];
