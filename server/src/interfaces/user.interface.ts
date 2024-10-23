import { User } from "../entity/user.entity";

export type IUser = User & {
  username: string;
};

export type IRole = "superadmin" | "manager" | "approval_manager";
