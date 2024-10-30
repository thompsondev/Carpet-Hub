import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";
import {
  RoleID,
  RolePermissions,
  UserRole,
} from "../interfaces/role.interface";

@Entity({ name: "roles" })
export class Role {
  @PrimaryColumn({
    nullable: false,
    type: "int",
    default: RoleID.MANAGER,
    unique: true,
  })
  id!: number;

  @Column({
    nullable: false,
    type: "enum",
    enum: UserRole,
    default: UserRole.MANAGER,
  })
  name!: UserRole;

  @Column({
    nullable: false,
    type: "enum",
    array: true,
    enum: RolePermissions,
    default: [RolePermissions.VIEW],
  })
  permissions!: RolePermissions[];

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
