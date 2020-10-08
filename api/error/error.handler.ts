import { Request, Response, NextFunction } from "express";
import { LoggerService } from "../services/logger.service";

export interface ApiError extends Error {
  message: string;
  httpStatus?: number;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.log) {
    req.log.child({ error: err }).error("ApiError");
  } else {
    LoggerService.getInstance().log.child({ error: err }).error("ApiError");
  }
  if (err.httpStatus) {
    return res.status(err.httpStatus).json({
      success: false,
      error: err.message,
    });
  }
  res.status(500).json({
    success: false,
    error: "Internal Server Error.",
  });
};
