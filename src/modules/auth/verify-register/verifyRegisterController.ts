import { Controller } from "../../../types";
import { verifyRegisterService } from "./verifyRegisterService";
import { Register } from "../register/registerSchema";

export const verifyRegisterController: Controller = async (_req, res, next) => {
  try {
    const register = res.locals?.tokenPayload as Register;
    await verifyRegisterService(register);
    res.status(201).json({ msg: "Cuenta creada correctamente." });
  } catch (error) {
    next(error);
  }
};
