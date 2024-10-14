import { Register } from "../register/registerSchema";
import { db } from "../../../db/db";
import { accounts, users } from "../../../db/schemas";

export const verifyRegisterService = async (newAccount: Register) => {
  await db.transaction(async () => {
    const [user] = await db
      .insert(users)
      .values({})
      .returning({ id: users.id });

    await db.insert(accounts).values({ ...newAccount, userId: user.id });
  });
};
