import { z } from "zod";
import { loginSchema } from "./loginSchema";
import { db } from "../../../db/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { EdarErr } from "../../../errors/EdarErr";
import { JWT } from "../../../config/jwt";
import { UUID } from "crypto";
import { Role } from "../../../db/schemas";

export const loginService = async (login: Login) => {
  const account = await db.query.accounts.findFirst({
    where: (account, { eq }) => eq(account.email, login.email),
  });
  if (!account)
    throw new EdarErr({ status: 401, msg: "Inicio de sesión invalido" });

  const isLogged = await bcrypt.compare(login.password, account.password);
  if (!isLogged)
    throw new EdarErr({ status: 401, msg: "Inicio de sesión invalido" });

  const token = jwt.sign(
    {
      id: account.id,
      name: account.name,
      role: account.role,
      img: account.img,
    },
    JWT.secret as string,
    { expiresIn: JWT.expiresIn }
  );

  return token;
};

type Login = z.infer<typeof loginSchema>;

export type TokenPayload = {
  id: UUID;
  name: string;
  role: Role;
  img: string;
};
