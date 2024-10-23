import * as express from "express";
import { UserController } from "../controllers/user.controller";
import { validateBody } from "../middlewares/validator";
import { CreateUserClass } from "../dto/user.dto";
import { asyncHandler } from "../helpers/asyncHandler";
import { authenticationMiddleware } from "../middlewares/authentication";
const Router = express.Router();

Router.post(
  "/signup",
  validateBody(CreateUserClass),
  asyncHandler(UserController.signup),
);

Router.post(
  "/createUser",
  authenticationMiddleware,
  validateBody(CreateUserClass),
  asyncHandler(UserController.signup),
);

export { Router as userRouter };
