import { Register } from "../register/registerSchema";
import { db } from "../../../db/db";
import { accounts, users } from "../../../db/schemas";

export const verifyRegisterService = async (newAccount: Register) => {
  await db.transaction(async (tx) => {
    const [user] = await tx.insert(users).values({}).returning();
    await tx.insert(accounts).values({ ...newAccount, userId: user.id });
  });
};
