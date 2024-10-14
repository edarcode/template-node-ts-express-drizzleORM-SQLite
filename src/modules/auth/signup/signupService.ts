import jwt from "jsonwebtoken";
import { sendMailToVerifySignupService } from "./sendMailToVerifySignupService";
import { z } from "zod";
import { signupSchema } from "./signupSchema";
import { db } from "../../../db/db";
import bcrypt from "bcrypt";
import { BCRYPT } from "../../../config/bcrypt";
import { JWT } from "../../../config/jwt";
import { EdarErr } from "../../../errors/EdarErr";

export const signupService = async (signup: Signup) => {
  await checkSignup(signup);

  const newSignup = { ...signup };
  const passHashed = await bcrypt.hash(newSignup.password, BCRYPT.salt);
  newSignup.password = passHashed;

  const token = jwt.sign(newSignup, JWT.secret as string, {
    expiresIn: JWT.expiresInSignup,
  });

  const link = `${process.env.API_BASE_URL}/auth/verify-signup/${token}`;
  await sendMailToVerifySignupService(newSignup.email, link);
};

const checkSignup = async (signup: Signup) => {
  const account = await db.query.accounts.findFirst({
    where: (accounts, { eq }) => eq(accounts.email, signup.email),
  });
  if (account) throw new EdarErr({ status: 400, msg: "Email no disponible" });
};

type Signup = z.infer<typeof signupSchema>;
