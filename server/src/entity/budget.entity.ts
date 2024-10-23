import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Budget {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  description!: string;

  @Column("float", { nullable: false })
  amount!: number;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;
}
