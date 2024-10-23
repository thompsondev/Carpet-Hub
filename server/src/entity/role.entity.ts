import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { IRole, IRolePermissions } from "../interfaces/role.interface";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: IRole;

  @Column({ nullable: false })
  permissions!: IRolePermissions[];

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
