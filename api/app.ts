import express, { Express, Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { config as dotenvConfig } from "dotenv";
import httpLogger from "pino-http";
import path from "path";

dotenvConfig();

import { errorHandler, ApiError } from "./error/error.handler";
import authRoutes from "./auth/auth.routes";
import eventsRoutes from "./events/events.routes";
import certificateRoutes from "./certificates/certificates.routes";
import { DatabaseService } from "./services/database.service";
import { LoggerService } from "./services/logger.service";
import { StorageService } from "./services/storage.service";
import { errors } from "./error/error.constant";

const app: Express = express();

const whitelist = ["https://aaruush.org", "https://googleapis.com"];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
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
          defaultSrc: ["'self'", "'unsafe-inline'", "* https:"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://www.googletagmanager.com/",
            "https://www.google-analytics.com/",
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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "client", "build")));
  app.use("*", (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
    } catch (err) {
      next(err);
    }
  });
}

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
