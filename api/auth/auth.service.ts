import { google } from "googleapis";
import axios from "axios";
import { errors } from "../error/error.constant";
import { oauthGoogleResponse, googleProfile, userCreds } from "./auth.schema";
import { sign as jwtSign } from "jsonwebtoken";

export const generateAuthUrl = async (): Promise<string> => {
  const oauth2client = new google.auth.OAuth2({
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENTSECRET,
    redirectUri: process.env.OAUTH_REDIRECTURI,
  });
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const url = oauth2client.generateAuthUrl({
    scope: scopes,
    access_type: "online",
  });

  return url;
};

export const exchangeAuthCode = async (authCode: string): Promise<string> => {
  try {
    const { data: oauthResponse } = await axios.post<oauthGoogleResponse>(
      "https://oauth2.googleapis.com/token",
      {
        client_id: process.env.OAUTH_CLIENTID,
        client_secret: process.env.OAUTH_CLIENTSECRET,
        redirect_uri: process.env.OAUTH_REDIRECTURI,
        grant_type: "authorization_code",
        code: authCode,
      }
    );
    return oauthResponse.access_token;
  } catch (err) {
    if (!err.response) {
      throw errors.INTERNAL_SERVER_ERROR;
    } else {
      throw errors.GOOGLE_OAUTH_ERROR;
    }
  }
};

export const getUserGoogleProfile = async (
  accessToken: string
): Promise<userCreds> => {
  try {
    const { data: userProfile } = await axios.get<googleProfile>(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return {
      email: userProfile.email,
      name: userProfile.name,
    };
  } catch (err) {
    if (!err.response) {
      throw errors.INTERNAL_SERVER_ERROR;
    } else {
      throw errors.GOOGLE_OAUTH_ERROR;
    }
  }
};

export const generateJwt = async (user: userCreds): Promise<string> => {
  const jwt = jwtSign(user, process.env.JWT_SECRET!, {
    issuer: "aaruush.org",
    expiresIn: "1d",
  });
  return jwt;
};
