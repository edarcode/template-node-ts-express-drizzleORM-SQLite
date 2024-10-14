import { z } from "zod";
import { signupSchema } from "../signup/signupSchema";
import { db } from "../../../db/db";
import { accounts } from "../../../db/schemas";

export const verifySignupService = async (newAccount: NewAccount) => {
  await db.insert(accounts).values({ ...newAccount });
};

type NewAccount = z.infer<typeof signupSchema>;
