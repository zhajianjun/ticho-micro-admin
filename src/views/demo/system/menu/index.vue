<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button type="primary" v-auth="'MenuAdd'" @click="handleCreate">新增</a-button>
        <a-button type="primary" v-if="showSelect" @click="expandAll">展开</a-button>
        <a-button type="primary" v-if="showSelect" @click="collapseAll">收缩</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:file-add-outlined',
              type: 'link',
              color: 'warning',
              ifShow: hasPermission('MenuAdd'),
              onClick: handleCreate.bind(null, record),
            },
            {
              icon: 'clarity:note-edit-line',
              ifShow: hasPermission('MenuModify'),
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              ifShow: hasPermission('MenuDel'),
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <MenuDrawer @register="registerDrawer" :treeData="treeData" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { delMenu, getMenuList } from '/@/api/sys/menu';

  import { useDrawer } from '/@/components/Drawer';
  import MenuDrawer from './MenuDrawer.vue';

  import { columns } from './menu.data';
  import { cloneDeep } from 'lodash-es';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'MenuManagement',
    components: { BasicTable, MenuDrawer, TableAction },
    setup() {
      const { hasPermission } = usePermission();
      const treeData = ref([]);
      const [registerDrawer, { openDrawer }] = useDrawer();
      let showSelect = hasPermission('MenuSelect');
      const [registerTable, { reload, expandAll, collapseAll }] = useTable({
        title: '菜单列表',
        api: async () => {
          const res = await getMenuList();
          treeData.value = cloneDeep(res) as any;
          return {
            rows: res,
          };
        },
        columns,
        useSearchForm: showSelect,
        formConfig: {
          showActionButtonGroup: false,
          // showSubmitButton: showSelect,
          // showResetButton: showSelect,
        },
        tableSetting: {
          redo: showSelect,
        },
        isTreeTable: true,
        immediate: showSelect,
        pagination: false,
        striped: true,
        showTableSetting: true,
        canColDrag: true,
        bordered: true,
        showIndexColumn: false,
        canResize: true,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
        rowKey: 'id',
        // rowSelection: {
        //   type: 'radio',
        //   onSelect: onSelect,
        //   onSelectAll: onSelectAll,
        // },
      });

      function handleCreate(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openDrawer(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        delMenu(record.id).then(() => {
          reload();
        });
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        // nextTick(expandAll);
      }

      return {
        treeData,
        registerTable,
        registerDrawer,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
        reload,
        hasPermission,
        showSelect,
        expandAll,
        collapseAll
      };
    },
  });
</script>
