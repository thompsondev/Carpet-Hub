import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { Role } from "./role.entity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index({ unique: true })
  @Column({ nullable: false })
  username!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 100, nullable: false })
  email!: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  name!: string;

  @Column({ nullable: false })
  password!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_date!: Date;

  @ManyToOne(() => Role, (role) => role.users)
  role!: Role;

  constructor(args: {
    password: string;
    username: string;
    email: string;
    name: string;
    role: Role;
  }) {
    Object.assign(this, args);
  }
}
