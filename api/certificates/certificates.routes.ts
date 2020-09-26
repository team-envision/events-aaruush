import { Router, Request, Response, NextFunction } from "express";

import { JwtRequestSchema, validateJwt } from "../util/validateJwt";
import validateQuery from "../util/validateQuery";
import {
  certificateRequestSchema,
  certificateRequest,
  certificateVerifyRequestSchema,
  certificateVerifyRequest,
  registrationSchema,
} from "./certificates.schema";
import {
  hasAttended,
  generateCertificate,
  verifyCertificate,
} from "./certificates.service";

const router: Router = Router();

const handlePostCertificatesGenerate = async (
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

const handleGetCertificatesVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { registrantId } = req.query as certificateVerifyRequest;
    const userReg: registrationSchema = await verifyCertificate(registrantId);
    res.status(200).json({ success: true, ...userReg });
  } catch (err) {
    next(err);
  }
};

router.post(
  "/certificates/generate",
  validateQuery("headers", JwtRequestSchema),
  validateJwt(false),
  validateQuery("body", certificateRequestSchema),
  handlePostCertificatesGenerate
);

router.get(
  "/certificates/verify",
  validateQuery("query", certificateVerifyRequestSchema),
  handleGetCertificatesVerify
);

export default router;
