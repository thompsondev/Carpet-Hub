import { Request, Response } from "express";
import { User } from "../entity/user.entity";
import { encrypt } from "../helpers/encrypt";
import { AppDataSource } from "../db/data-source";
import { CreateUserRequest, UserResponse } from "../dto/user.dto";

export class UserController {
  static async signup(
    req: Request<object, object, CreateUserRequest>,
    res: Response,
  ) {
    const { username, name, email, password, role } = req.body;
    const encryptedPassword = await encrypt.encryptpass(password);
    const user = new User({
      name,
      username,
      email,
      password: encryptedPassword,
      role,
    });

    const userRepository = AppDataSource.getRepository(User);
    await userRepository.save(user);

    // Use the UserResponse DTO to structure the data being sent in the response
    const userDataSent: UserResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      username: user.username,
    };

    const token = encrypt.generateToken(userDataSent);

    return res
      .status(200)
      .json({ message: "User created successfully", token, userDataSent });
  }
}
