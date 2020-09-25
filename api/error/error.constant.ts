export const errors = {
  BAD_REQUEST: {
    httpStatus: 400,
    message: "Bad Request.",
  },
  INTERNAL_SERVER_ERROR: {
    httpStatus: 500,
    message: "Internal Server Error.",
  },
  UNAUTHORIZED: {
    httpStatus: 401,
    message: "Unauthorized.",
  },
  NOT_FOUND: {
    httpStatus: 404,
    message: "Resource Not Found.",
  },
  GOOGLE_OAUTH_ERROR: {
    httpStatus: 401,
    message: "Google OAuth Error.",
  },
  MONGODB_CONNECT_ERROR: {
    httpStatus: 500,
    message: "Could Not Connect to MongoDB.",
  },
  AMAZONS3_CONNECT_ERROR: {
    httpStatus: 500,
    message: "Could Not Connect to Amazon S3.",
  },
  CERTIFICATE_NOT_FOUND: {
    httpStatus: 404,
    message: "Certificate Not Found.",
  },
  S3_FILE_NOT_FOUND: {
    httpStatus: 404,
    message: "Certificate Not Found.",
  },
  JWT_ERROR: {
    httpStatus: 403,
    message: "JWT Token Not Found.",
  },
};
