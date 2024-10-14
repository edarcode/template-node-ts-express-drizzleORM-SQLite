import { z } from "zod";
import { Controller } from "../../../types";
import { verifySignupService } from "./verifySignupService";
import { signupSchema } from "../signup/signupSchema";

export const verifySignupController: Controller = async (_req, res, next) => {
  try {
    await verifySignupService(res.locals?.tokenPayload as Signup);
    res.status(201).json({ msg: "Cuenta creada correctamente." });
  } catch (error) {
    next(error);
  }
};

type Signup = z.infer<typeof signupSchema>;
