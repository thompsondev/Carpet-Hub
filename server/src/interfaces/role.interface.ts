import { Role } from "../entity/role.entity";

export type IRole = "superadmin" | "manager" | "approval_manager";

export type IRolePermissions = "Admin" | "Editor" | "Viewer";

export const predefinedRoles: Omit<Role, "users">[] = [
  { name: "superadmin", permissions: ["Admin", "Editor", "Viewer"], id: 1 },
  { name: "approval_manager", permissions: ["Editor", "Viewer"], id: 2 },
  { name: "manager", permissions: ["Viewer"], id: 3 },
];
