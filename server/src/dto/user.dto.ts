import { User } from "../entity/user.entity";

// export class UserResponse {
//   id!: string;
//   name!: string;
//   email!: string;
//   role!: Role;
// }

// export type Payload = InstanceType<typeof UserResponse>;

export type UserResponse = Pick<
  User,
  "id" | "username" | "role" | "email" | "name"
>;

export type Payload = UserResponse;

export interface CreateUserRequest extends UserResponse {
  password: string; // Include password in the interface
}
