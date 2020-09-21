import * as MongoDB from "mongodb";
import { errors } from "../error/error.constant";
import { LoggerService } from "./logger.service";

export class DatabaseService {
  private static instance: DatabaseService;
  private dbClient: MongoDB.MongoClient = new MongoDB.MongoClient(
    process.env.MONGO_URI!,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  private constructor() {}

  public initalize = async (): Promise<void> => {
    try {
      await this.dbClient.connect();
      LoggerService.getInstance().log.info("Connected to MongoDB");
    } catch (err) {
      LoggerService.getInstance().log.fatal(
        "Could not connect to MongoDB\n%o",
        err
      );
      throw errors.MONGODB_CONNECT_ERROR;
    }
  };

  public static getInstance = (): DatabaseService => {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  };
}
