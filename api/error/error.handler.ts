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
    req.log.child({ error: err }).error("ApiError");
    return res.status(err.httpStatus).json({
      success: false,
      error: err.message,
    });
  }
  if (req.log) {
    req.log.child({ error: err }).error("ApiError");
  } else {
    LoggerService.getInstance().log.child({ error: err }).error("ApiError");
  }
  res.status(500).json({
    success: false,
    error: "Internal Server Error.",
  });
};
