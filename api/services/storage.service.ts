import { S3 } from "aws-sdk";
import { errors } from "../error/error.constant";
import { LoggerService } from "./logger.service";

export class StorageService {
  private static instance: StorageService;
  public s3!: S3;

  private constructor() {}

  public initialize = async (): Promise<void> => {
    try {
      this.s3 = new S3({
        region: "ap-south-1",
      });
      await this.s3.headBucket({ Bucket: process.env.AWS_S3BUCKET! }).promise();
      LoggerService.getInstance().log.info("Connected to Amazon S3");
    } catch (err) {
      LoggerService.getInstance().log.fatal(
        "Could not connect to Amazon S3\n%o",
        err
      );
      throw errors.AMAZONS3_CONNECT_ERROR;
    }
  };

  public static getInstance = (): StorageService => {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  };
}
