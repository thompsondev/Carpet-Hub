import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { IRole } from "../interfaces/user.interface";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  name!: IRole;

  @Column({ nullable: false })
  roleId!: number;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
