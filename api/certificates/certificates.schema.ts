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
  attended: boolean;
  registrantId: string;
  slug: string;
  certificate: {
    category: string;
    [x: string]: string;
  };
}

export const certificateVerifyRequestSchema = yup
  .object({
    registrantId: yup
      .string()
      .trim()
      .min(1, "registrantId cannot be null")
      .required(),
  })
  .required();

export type certificateVerifyRequest = yup.InferType<
  typeof certificateVerifyRequestSchema
>;
