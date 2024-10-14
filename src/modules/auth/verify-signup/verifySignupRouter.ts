import { Router } from "express";
import { verifySignupController } from "./verifySignupController";
import { verifyTokenSentByParams } from "../../../middlewares/verifyTokenSentByParams";

export const verifySignupRouter = Router();

verifySignupRouter.get(
  "/:token",
  verifyTokenSentByParams,
  verifySignupController
);
