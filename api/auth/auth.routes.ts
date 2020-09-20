import { Router, Request, Response, NextFunction } from "express";
import {
  generateAuthUrl,
  exchangeAuthCode,
  getUserGoogleProfile,
  generateJwt,
} from "./auth.service";
import { errors } from "../error/error.constant";
import validateQuery from "../util/validateQuery";
import { oauthVerifyRequestSchema, oauthVerifyRequest } from "./auth.schema";

const router = Router();

async function handlePostAuthGenerate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const url = await generateAuthUrl();
    if (!url) {
      throw errors.INTERNAL_SERVER_ERROR;
    } else {
      res.redirect(url);
    }
  } catch (err) {
    next(err);
  }
}

async function handlePostAuthVerify(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { error, code } = req.query as oauthVerifyRequest;
    if (error) {
      throw errors.UNAUTHORIZED;
    }
    const accessToken = await exchangeAuthCode(code!);
    const profile = await getUserGoogleProfile(accessToken);
    const jwtToken = await generateJwt(profile);
    res.status(200).json({
      success: true,
      authToken: jwtToken,
      profile: {
        name: profile.required.name,
        email: profile.required.email,
        picture: profile.picture,
      },
    });
  } catch (err) {
    next(err);
  }
}

router.get("/auth/generate", handlePostAuthGenerate);
router.get(
  "/auth/verify",
  validateQuery("query", oauthVerifyRequestSchema),
  handlePostAuthVerify
);

export default router;
