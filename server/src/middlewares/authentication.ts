import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Payload } from "../dto/user.dto";
import createHttpError from "http-errors";
dotenv.config();

// export interface AppRequest<K, T> extends Request<object, object, T> {
//     currentUser: K
//     body: T
// }

export interface AppRequest<K = unknown, T = Record<string, unknown>>
  extends Request {
  currentUser?: K; // Optional currentUser property
  body: T; // Body of the request with type T
}

export interface IRequest {
  currentUser?: Payload;
}

// req: Request<object, object, CreateUserRequest>,

export const authenticationMiddleware = (
  req: AppRequest<Payload, unknown>,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  if (!header) {
    throw createHttpError.Unauthorized("Unauthorized");
  }
  const token = header.split(" ")[1];
  if (!token) {
    throw createHttpError.Unauthorized("Invalid token");
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET!) as Payload;
  if (!decode) {
    throw createHttpError.Unauthorized("Invalid token");
  }

  req.currentUser = decode;
  next();
};

export function checkCurrentUser(req: AppRequest<Payload, unknown>) {
  if (!req.currentUser) {
    throw createHttpError.Unauthorized("Unauthorized");
  }
}
