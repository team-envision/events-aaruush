import * as yup from "yup";
export interface certSchema {
  category: string;
  fileName: string;
  fontColor: "WHITE" | "BLACK";
  objects: Array<{
    type: string;
    x: number;
    y: number;
    maxWidth: number;
    maxHeight: number;
    fontSize: 8 | 16 | 32 | 64 | 128;
  }>;
  qr: {
    enabled: boolean;
    darkHex: string;
    lightHex: string;
    x: number;
    y: number;
    size: number;
  };
}

export interface EventSchema {
  _id?: string;
  name: string;
  slug: string;
  date: Date;
  poster: Array<string>;
  description: string;
  category: string;
  isActive: boolean;
  link: string;
  certificates: Array<certSchema>;
}

export const EventPostRequestSchema = yup
  .object({
    name: yup.string().trim().min(1, "name cannot be null").required(),
    date: yup
      .date()
      .min(new Date("01 January 2020 00:00:00 +5:30"), "invalid date")
      .required(),
    poster: yup
      .array(
        yup
          .string()
          .trim()
          .min(1, "poster[i] cannot be null")
          .url("poster[i] not a valid URL")
          .required()
      )
      .min(1)
      .required(),
    link: yup.string().trim().min(1, "link cannot be null").required(),
    description: yup
      .string()
      .trim()
      .min(1, "description cannot be null")
      .required(),
    category: yup
      .string()
      .trim()
      .min(1, "description cannot be null")
      .required(),
  })
  .required();

export interface EventPostRequest
  extends Omit<
    Omit<yup.InferType<typeof EventPostRequestSchema>, "poster">,
    "date"
  > {
  poster: Array<string>;
  date: Date;
}
