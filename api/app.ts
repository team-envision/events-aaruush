import express, { Express, Request, Response, NextFunction } from "express";
import cors, { CorsOptions } from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { config as dotenvConfig } from "dotenv";
import httpLogger from "pino-http";

import { errorHandler } from "./error/error.handler";
import authRoutes from "./auth/auth.routes";
import certificateRoutes from "./certificates/certificates.routes";
import { DatabaseService } from "./services/database.service";
import { LoggerService } from "./services/logger.service";
import { StorageService } from "./services/storage.service";

dotenvConfig();
const app: Express = express();

const whitelist = ["https://aaruush.org", "https://googleapis.com"];
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin!) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS."));
    }
  },
};
if (process.env.NODE_ENV === "production") {
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(httpLogger({ redact: ["req.headers.authorization"] }));

app.use("/api/v1", authRoutes);
app.use("/api/v1", certificateRoutes);

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
        `Listening For Awesome Stuff on Port ${process.env.PORT}`
      );
    });
  })
  .catch((_) => {
    process.exit(1);
  });
