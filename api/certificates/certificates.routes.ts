import { Router, Request, Response, NextFunction } from "express";

import { JwtRequestSchema, validateJwt } from "../util/validateJwt";
import validateQuery from "../util/validateQuery";
import {
  certificateRequestSchema,
  certificateRequest,
} from "./certificates.schema";
import { hasAttended, generateCertificate } from "./certificates.service";

const router: Router = Router();

const handlePostCertificates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, slug } = req.body as certificateRequest;
    const userReg = await hasAttended({ email, slug });
    const response = await generateCertificate(userReg);
    res.set({
      "Content-Type": "image/jpeg",
      "Content-Disposition": "attachment; filename=certificate.jpeg",
      "Content-Length": response.length,
    });
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

router.post(
  "/certificates",
  validateQuery("headers", JwtRequestSchema),
  validateJwt,
  validateQuery("body", certificateRequestSchema),
  handlePostCertificates
);

export default router;
