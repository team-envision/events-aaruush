import { verify, JsonWebTokenError } from "jsonwebtoken";
import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

export const JwtRequestSchema = yup
  .object({
    authorization: yup
      .string()
      .trim()
      .min(1, "JWT cannot be null")
      .matches(/^Bearer .+$/, "JWT should be Bearer Token"),
  })
  .required();

interface jwtPayload {
  email: string;
  name: string;
}

type JwtRequest = yup.InferType<typeof JwtRequestSchema>;

export const validateJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers as JwtRequest;
    if (!authorization) {
      return next();
    }
    const authToken = authorization.split(" ")[1];
    const payload: jwtPayload = verify(
      authToken,
      process.env.JWT_SECRET!
    ) as jwtPayload;
    req.body = {
      ...req.body,
      email: payload.email,
      name: payload.name,
    };
    next();
  } catch (err) {
    next({
      httpStatus: 403,
      message: `${err.name}: ${err.message}`,
    });
  }
};
