import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { Payload } from "../dto/user.dto";

dotenv.config();
const { JWT_SECRET = "" } = process.env;
export class encrypt {
  static async encryptpass(password: string) {
    try {
      return await bcrypt.hash(password, 12);
    } catch (e) {
      console.log(e);
      throw new Error("Failed to encrypt password");
    }
  }
  static async comparepassword(hashPassword: string, password: string) {
    return bcrypt.compare(password, hashPassword);
  }

  static generateToken(payload: Payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
  }
}
