import { z } from "zod";
import { Controller } from "../../../types";
import { loginService } from "./loginService";
import { loginSchema } from "./loginSchema";

export const loginController: Controller = async (req, res, next) => {
  try {
    const token = await loginService(req.body as Body);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

type Body = z.infer<typeof loginSchema>;
