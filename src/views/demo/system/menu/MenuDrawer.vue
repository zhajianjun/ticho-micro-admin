<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="50%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './menu.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';

  import { saveMenu, modifyMenu } from '/@/api/sys/menu';

  export default defineComponent({
    name: 'MenuDrawer',
    components: { BasicDrawer, BasicForm },
    props: {
      treeData: Array,
    },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const isUpdate = ref(true);

      const [registerForm, { resetFields, setFieldsValue, updateSchema, validate }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
        baseColProps: { lg: 12, md: 24 },
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        await resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        if (unref(isUpdate)) {
          await setFieldsValue({
            ...data.record,
          });
        } else {
          // 创建菜单设置类型默认值
          await setFieldsValue({
            type: 1,
          });
        }
        const treeData = props.treeData;
        await updateSchema({
          field: 'parentId',
          componentProps: { treeData },
        });
      });

      const getTitle = computed(() => (!unref(isUpdate) ? '新增菜单' : '编辑菜单'));

      async function handleSubmit() {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });
        if (values.type === 3 && values.perms?.length) {
          values.perms = values.perms.map((n) => n.join(':')).toString();
        }
        if (unref(isUpdate)) {
          await modifyMenu(values);
        } else {
          if (!values.parentId) {
            values.parentId = 0;
          }
          await saveMenu(values);
        }
        closeDrawer();
        emit('success');
        setDrawerProps({ confirmLoading: false });
      }

      return { registerDrawer, registerForm, getTitle, handleSubmit };
    },
  });
</script>
