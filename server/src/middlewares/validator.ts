import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import type { NextFunction, Request, Response } from "express";
import { ValidateError } from "../helpers/error";

export function validateBody<T extends object>(
  targetClass: ClassConstructor<T>,
) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const instance = plainToInstance(targetClass, req.body);
      const errors = await validate(instance, {
        forbidUnknownValues: true,
        validationError: {
          target: false,
        },
      });
      const fieldsErrors: Record<string, { message: string; value: string }> =
        {};

      if (errors.length > 0) {
        errors.forEach((error) => {
          if (error.constraints) {
            fieldsErrors[error.property] = {
              message: Object.values(error.constraints).join(", "),
              value: error.value as string,
            };
          }
          if (error.children) {
            error.children.forEach((errorNested) => {
              if (errorNested.constraints) {
                fieldsErrors[errorNested.property] = {
                  message: Object.values(errorNested.constraints).join(", "),
                  value: errorNested.value as string,
                };
              }
            });
          }
        });
        next(new ValidateError(fieldsErrors, "Validation failed"));
        return;
      }
      next();
    } catch (error) {
      // Handle unexpected errors
      next(error);
    }
  };
}
