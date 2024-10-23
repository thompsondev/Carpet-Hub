import { Entity, Column, OneToMany } from "typeorm";
import { User } from "./user.entity";
import {
  RoleID,
  RolePermissions,
  UserRole,
} from "../interfaces/role.interface";

@Entity()
export class Role {
  @Column({
    type: "enum",
    enum: RoleID,
    default: RoleID.MANAGER,
    unique: true,
  })
  id!: number;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.MANAGER,
  })
  name!: UserRole;

  @Column({ nullable: false })
  permissions!: RolePermissions[];

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
