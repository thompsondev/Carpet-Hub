import { Response } from "express";
import { User } from "../entity/user.entity";
import { encrypt } from "../helpers/encrypt";
import {
  CreateUserRequest,
  Payload,
  SignUpResponse,
  CreateUserResponse,
} from "../dto/user.dto";
import { Role } from "../entity/role.entity";
import { checkCurrentUser } from "../middlewares/authentication";
import createHttpError from "http-errors";
import { RoleID, RolePermissions } from "../interfaces/role.interface";
import { AppRequest } from "../types/general.interface";
import { AppDataConnection } from "../server";

export class UserController {
  // super-admin account creation
  static signup = async (
    req: AppRequest<unknown, Omit<CreateUserRequest, "role">>,
    res: Response,
  ): Promise<void> => {
    const { username, name, email, password } = req.body;

    const userRepository = AppDataConnection.getRepository(User);
    const superadmin = await userRepository.findOne({
      relations: { role: true },
      where: { role: { id: RoleID.ADMIN } },
    });

    if (superadmin) {
      res.status(400).json({ message: "Superadmin already exists" });
      return;
    }

    const roleRepository = AppDataConnection.getRepository(Role);
    const selectedRole = await roleRepository.findOne({
      where: { id: RoleID.ADMIN },
    });

    if (!selectedRole) {
      res.status(400).json({ message: "Error creating user" });
      return;
    }

    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User({
      name,
      username,
      email,
      password: encryptedPassword,
      role: selectedRole,
    });

    await userRepository.save(user);
    // Use the UserResponse DTO to structure the data being sent in the response
    const userDataSent: SignUpResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: selectedRole.name,
      username: user.username,
    };

    const token = encrypt.generateToken(userDataSent);

    res
      .status(200)
      .json({ message: "User created successfully", token, userDataSent });
    return;
  };

  static createUser = async (
    req: AppRequest<Payload, CreateUserRequest>,
    res: Response,
  ): Promise<void> => {
    checkCurrentUser(req);
    const userRepository = AppDataConnection.getRepository(User);
    const adminUser = await userRepository.findOne({
      where: { id: req.currentUser?.id },
    });

    if (!adminUser?.role.permissions.includes(RolePermissions.SUPER))
      throw createHttpError.Forbidden("Forbidden");

    const { username, name, email, password, role } = req.body;
    const roleRepository = AppDataConnection.getRepository(Role);
    const selectedRole = await roleRepository.findOne({
      where: { name: role },
    });

    if (!selectedRole) {
      res.status(404).json({ message: "Role not found" });
      return;
    }
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User({
      name,
      username,
      email,
      password: encryptedPassword,
      role: selectedRole,
    });

    await userRepository.save(user);
    // Use the UserResponse DTO to structure the data being sent in the response
    const userDataSent: CreateUserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: selectedRole.name,
      username: user.username,
      password: password,
    };

    res
      .status(200)
      .json({ message: "User created successfully", userDataSent });
    return;
  };
}
