import { Request, Response, NextFunction } from "express";
import { LoggerService } from "../services/logger.service";

interface ApiError {
  message: string;
  httpStatus?: number;
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.httpStatus) {
    return res.status(err.httpStatus).json({
      success: false,
      error: err.message,
    });
  }
  if (req.log) {
    req.log.error(err);
  } else {
    LoggerService.getInstance().log.error(err);
  }
  res.status(500).json({
    success: false,
    error: "Internal Server Error.",
  });
};
