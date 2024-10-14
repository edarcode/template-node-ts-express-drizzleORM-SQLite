import "../services/dotenv";
import bcrypt from "bcrypt";
import { accounts, contacts, Role } from "./schemas";
import { BCRYPT } from "../config/bcrypt";
import { db } from "./db";

const EDAR = {
  id: crypto.randomUUID(),
  email: process.env.ADMIN_EMAIL!,
  password: process.env.ADMIN_PASSWORD!,
  role: Role.admin,
};

const LORE = {
  id: crypto.randomUUID(),
  email: "lore@gmail.com",
  password: "123456",
};

const MYKE = {
  id: crypto.randomUUID(),
  email: "myke@gmail.com",
  password: "123456",
};

const seed = async () => {
  EDAR.password = await bcrypt.hash(EDAR.password, BCRYPT.salt);
  LORE.password = await bcrypt.hash(LORE.password, BCRYPT.salt);
  MYKE.password = await bcrypt.hash(MYKE.password, BCRYPT.salt);

  await db.delete(accounts).execute();
  await db.insert(accounts).values([EDAR, LORE, MYKE]);

  await db.insert(contacts).values([
    {
      name: "ana",
      tell: "+57 3028389987",
      img: "https://randomuser.me/api/portraits/women/3.jpg",
      accountId: EDAR.id,
    },
    {
      name: "luis",
      tell: "+57 3107654321",
      img: "https://randomuser.me/api/portraits/men/41.jpg",
      accountId: EDAR.id,
    },

    {
      name: "camila",
      tell: "+57 3123456789",
      img: "https://randomuser.me/api/portraits/women/2.jpg",
      accountId: EDAR.id,
    },
    {
      name: "andres",
      tell: "+57 3012345678",
      img: "https://randomuser.me/api/portraits/men/3.jpg",
      accountId: EDAR.id,
    },
    {
      name: "sofia",
      tell: "+57 3156789012",
      img: "https://randomuser.me/api/portraits/women/4.jpg",
      accountId: EDAR.id,
    },
    {
      name: "carlos",
      tell: "+57 3109876543",
      img: "https://randomuser.me/api/portraits/men/5.jpg",
      accountId: EDAR.id,
    },
    {
      name: "maria",
      tell: "+57 3187654321",
      img: "https://randomuser.me/api/portraits/women/6.jpg",
      accountId: EDAR.id,
    },
    {
      name: "juan",
      tell: "+57 3201234567",
      img: "https://randomuser.me/api/portraits/men/7.jpg",
      accountId: EDAR.id,
    },
    {
      name: "valentina",
      tell: "+57 3176543210",
      img: "https://randomuser.me/api/portraits/women/8.jpg",
      accountId: EDAR.id,
    },
    {
      name: "sebastian",
      tell: "+57 3009876543",
      img: "https://randomuser.me/api/portraits/men/9.jpg",
      accountId: EDAR.id,
    },
    {
      name: "laura",
      tell: "+57 3198765432",
      img: "https://randomuser.me/api/portraits/women/10.jpg",
      accountId: EDAR.id,
    },
    {
      name: "alejandro",
      tell: "+57 3045678901",
      img: "https://randomuser.me/api/portraits/men/11.jpg",
      accountId: EDAR.id,
    },
    { name: "camila", tell: "+57 3123456789", accountId: EDAR.id },
    { name: "diego", tell: "+57 3176543210", accountId: EDAR.id },
    { name: "sofía", tell: "+57 3009876543", accountId: EDAR.id },
    { name: "felipe", tell: "+57 3141234567", accountId: EDAR.id },

    { name: "edar", tell: "+57 3033", accountId: LORE.id },
    { name: "zoila", tell: "+57 3039", accountId: LORE.id },
    { name: "el muo", tell: "+57 3040", accountId: LORE.id },
  ]);
};

seed().catch(console.error);
