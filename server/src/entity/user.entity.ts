import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Role } from "./role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  constructor({
    password,
    username,
    email,
    name,
    role,
  }: {
    password: string;
    username: string;
    email: string;
    name: string;
    role: Role;
  }) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.name = name;
    this.role = role;
  }
}
