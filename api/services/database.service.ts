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
      LoggerService.getInstance()
        .log.child({ error: err })
        .fatal("Could not connect to MongoDB");
      throw errors.MONGODB_CONNECT_ERROR;
    }
  };

  public static getInstance = (): DatabaseService => {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  };

  /**
   * Returns the Collection Instance of the given database
   * @param {string} db The Database Name
   * @param {string} collection The Collection Name
   * @returns {MongoDB.Collection} The instance
   */
  public getDb = async (
    db: string,
    collection: string
  ): Promise<MongoDB.Collection> => {
    return this.dbClient.db(db).collection(collection);
  };
}
