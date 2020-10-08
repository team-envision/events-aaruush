import { EventPostRequest, EventSchema } from "./events.schema";
import slugify from "slugify";
import { DatabaseService } from "../services/database.service";
import { errors } from "../error/error.constant";

/**
 * Add a new event
 * @param {EventPostRequest} input The POST request input
 * @returns {Promise<void>} Returns on successful addition
 */
export const addEvent = async (input: EventPostRequest): Promise<void> => {
  let dbEntry: EventSchema = {
    ...{ ...input, date: new Date(input.date) },
    slug: `${process.env.MONGO_DBNAME}-${slugify(input.name, { lower: true })}`,
    certificates: [],
  };
  const db = await DatabaseService.getInstance().getDb(
    process.env.MONGO_DBNAME!,
    "events"
  );
  const result = await db.insertOne(dbEntry);
  if (result.insertedCount <= 0) throw errors.MONGODB_QUERY_ERROR;
};

/**
 * Get all the events
 * @returns {Promise<Array<EventSchema>>} List of events.
 */
export const getEvents = async (): Promise<Array<EventSchema>> => {
  const db = await DatabaseService.getInstance().getDb(
    process.env.MONGO_DBNAME!,
    "events"
  );
  const events = await db
    .find<EventSchema>({}, { projection: { certificates: 0 } })
    .sort({ date: 1 })
    .toArray();
  return events;
};
