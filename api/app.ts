import express, { Express, Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { config as dotenvConfig } from "dotenv";
import httpLogger from "pino-http";

import { errorHandler, ApiError } from "./error/error.handler";
import authRoutes from "./auth/auth.routes";
import eventsRoutes from "./events/events.routes";
import certificateRoutes from "./certificates/certificates.routes";
import { DatabaseService } from "./services/database.service";
import { LoggerService } from "./services/logger.service";
import { StorageService } from "./services/storage.service";
import { errors } from "./error/error.constant";

dotenvConfig();
const app: Express = express();

const whitelist = ["https://aaruush.org", "https://googleapis.com"];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin!) !== -1) {
      callback(null, true);
    } else {
      callback({ ...errors.CORS_ERROR, name: "CORS_ERROR" } as ApiError);
    }
  },
};
if (process.env.NODE_ENV === "production") {
  app.use(cors(corsOptions));
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
            "https://fonts.gstatic.com",
          ],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
            "https://fonts.gstatic.com",
          ],
          fontSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
            "https://fonts.gstatic.com",
          ],
          imgSrc: [
            "'self'",
            "data: blob: https://aaruush20-assets.s3.ap-south-1.amazonaws.com",
          ],
        },
      },
    })
  );
} else {
  app.use(cors());
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(httpLogger({ redact: ["req.headers.authorization"] }));

app.use("/api/v1", authRoutes);
app.use("/api/v1", certificateRoutes);
app.use("/api/v1", eventsRoutes);

app.use(errorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Cannot ${req.method} ${req.url}`,
  });
});

Promise.all([
  DatabaseService.getInstance().initalize(),
  StorageService.getInstance().initialize(),
])
  .then(() => {
    app.listen(process.env.PORT, () => {
      LoggerService.getInstance().log.info(
        `Server:${process.env.NODE_ENV}-mode on Port ${process.env.PORT}`
      );
    });
  })
  .catch((_) => {
    process.exit(1);
  });
