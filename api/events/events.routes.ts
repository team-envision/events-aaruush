import { Router, Request, Response, NextFunction } from "express";

import validateQuery from "../util/validateQuery";
import { EventPostRequest, EventPostRequestSchema } from "./events.schema";
import { addEvent, getEvents } from "./events.service";

const router = Router();

const handlePostEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const input = req.body as EventPostRequest;
    await addEvent(input);
    res.status(201).json({
      success: true,
      message: "Event created.",
    });
  } catch (err) {
    next(err);
  }
};

const handleGetEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const events = await getEvents();
    res.status(200).json({
      success: true,
      events,
    });
  } catch (err) {
    next(err);
  }
};
if (process.env.NODE_ENV === "development") {
  router.post(
    "/events",
    validateQuery("body", EventPostRequestSchema),
    handlePostEvents
  );
}
router.get("/events", handleGetEvents);

export default router;
