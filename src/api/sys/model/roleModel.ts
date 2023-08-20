export interface RoleDTO {
  /** 主键编号 */
  id: number;
  /** 角色编码 */
  code: string;
  /** 角色名称 */
  name: string;
  /** 租户编号 */
  tenantId: string;
  /** 备注信息 */
  remark: string;
}
