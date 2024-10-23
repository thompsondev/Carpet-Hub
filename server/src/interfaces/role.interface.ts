import { Role } from "../entity/role.entity";

export enum RolePermissions {
  SUPER = "Admin",
  EDIT = "Editor",
  VIEW = "Viewer",
}

export enum RoleID {
  ADMIN = 1,
  APPROVAL = 100,
  MANAGER = 1000,
}

export enum UserRole {
  ADMIN = "superadmin",
  APPROVAL = "approval_manager",
  MANAGER = "manager",
}

const RP = RolePermissions;
const RID = RoleID;

export const predefinedRoles: Omit<Role, "users">[] = [
  {
    name: UserRole.ADMIN,
    permissions: [RP.SUPER, RP.EDIT, RP.VIEW],
    id: RID.ADMIN,
  },
  {
    name: UserRole.APPROVAL,
    permissions: [RP.EDIT, RP.VIEW],
    id: RID.APPROVAL,
  },
  { name: UserRole.MANAGER, permissions: [RP.VIEW], id: RID.MANAGER },
];
