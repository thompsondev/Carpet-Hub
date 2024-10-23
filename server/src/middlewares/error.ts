import type { Request, Response, ErrorRequestHandler } from "express";
import { ValidateError } from "../helpers/error";

export const errorHandler =
  (): ErrorRequestHandler => (err: unknown, req: Request, res: Response) => {
    if (err instanceof ValidateError) {
      res.status(422).json({
        error: "Validation failed",
        details: err?.fields,
      });
      return;
    }
    if (
      err instanceof Error &&
      "statusCode" in err &&
      typeof err.statusCode === "number"
    ) {
      res.status(err.statusCode).json({
        error: err.message,
      });
      return;
    }
    res.status(500).json({
      error: "Something went wrong",
    });
    return;
  };
