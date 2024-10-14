import z from "zod";
import { emailSchema } from "../../../zod-schemas/emailSchema";
import { passwordSchema } from "../../../zod-schemas/passwordSchema";

export const signupSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strict();
