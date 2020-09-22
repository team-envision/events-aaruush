import * as yup from "yup";

export const certificateRequestSchema = yup
  .object({
    slug: yup.string().trim().min(1, "slug cannot be null").required(),
    email: yup
      .string()
      .trim()
      .min(1, "email cannot be null")
      .email()
      .required(),
    name: yup.string().trim().min(1, "name cannot be null"),
  })
  .required();

export type certificateRequest = yup.InferType<typeof certificateRequestSchema>;

export interface registrationSchema {
  _id: string;
  name: string;
  email: string;
  attended: "yes" | "no";
  registrantId: string;
  slug: string;
  winner?: {
    position: "1st" | "2nd" | "3rd";
  };
  theme?: string;
}
