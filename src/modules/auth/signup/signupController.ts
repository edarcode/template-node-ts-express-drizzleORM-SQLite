import { z } from "zod";
import { Controller } from "../../../types";
import { signupSchema } from "./signupSchema";
import { signupService } from "./signupService";

export const signupController: Controller = async (req, res, next) => {
  try {
    await signupService(req.body as Body);
    res
      .status(200)
      .json({ msg: "Se le ha enviado un correo con un link de verificación." });
  } catch (error) {
    next(error);
  }
};

type Body = z.infer<typeof signupSchema>;
