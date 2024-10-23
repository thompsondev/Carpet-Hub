import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Payload } from "../dto/user.dto";
import createHttpError from "http-errors";
import { AppRequest } from "../types/general.types";
dotenv.config();

export interface IRequest {
  currentUser?: Payload;
}

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
