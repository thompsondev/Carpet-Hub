import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { User } from "../entity/user.entity";
import { UserRole } from "../interfaces/role.interface";

export class CreateUserClass {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsEnum(UserRole)
  role!: UserRole;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}

export type CreateUserRequest = InstanceType<typeof CreateUserClass>;

export type UserResponse = Omit<CreateUserRequest, "password"> &
  Pick<User, "id">;

export type Payload = UserResponse;
