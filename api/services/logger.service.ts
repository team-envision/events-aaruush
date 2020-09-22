import pino, { Logger } from "pino";

export class LoggerService {
  private static instance: LoggerService;
  public log: Logger;
  private constructor() {
    this.log = pino({
      prettyPrint: process.env.NODE_ENV !== "production",
    });
  }

  public static getInstance = (): LoggerService => {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  };
}
