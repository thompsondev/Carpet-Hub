import { Response } from "express";
import { User } from "../entity/user.entity";
import { encrypt } from "../helpers/encrypt";
import { AppDataSource } from "../db/data-source";
import { CreateUserRequest, Payload, UserResponse } from "../dto/user.dto";
import { Role } from "../entity/role.entity";
import { AppRequest, checkCurrentUser } from "../middlewares/authentication";
import createHttpError from "http-errors";
import { RolePermissions } from "../interfaces/role.interface";

export class UserController {
  static signup = async (
    req: AppRequest<unknown, CreateUserRequest>,
    res: Response,
  ): Promise<void> => {
    const { username, name, email, password, role } = req.body;
    const roleRepository = AppDataSource.getRepository(Role);
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

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);
    // Use the UserResponse DTO to structure the data being sent in the response
    const userDataSent: UserResponse = {
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
    const userRepository = AppDataSource.getRepository(User);
    const adminUser = await userRepository.findOne({
      where: { id: req.currentUser?.id },
    });

    if (!adminUser?.role.permissions.includes(RolePermissions.SUPER))
      throw createHttpError.Forbidden("Forbidden");

    const { username, name, email, password, role } = req.body;
    const roleRepository = AppDataSource.getRepository(Role);
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
    const userDataSent: UserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: selectedRole.name,
      username: user.username,
    };

    res
      .status(200)
      .json({ message: "User created successfully", userDataSent });
    return;
  };
}
