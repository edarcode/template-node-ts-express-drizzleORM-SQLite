import { Router } from "express";
import { loginController } from "./loginController";
import { loginSchema } from "./loginSchema";
import { verifyBody } from "../../../middlewares/verifyBody";

export const loginRouter = Router();

loginRouter.post("", verifyBody(loginSchema), loginController);
