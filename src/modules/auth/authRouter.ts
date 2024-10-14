import { Router } from "express";
import { signupRouter } from "./signup/signupRouter";
import { verifySignupRouter } from "./verify-signup/verifySignupRouter";
import { loginRouter } from "./login/loginRouter";
import { refreshTokenRouter } from "./refresh-token/refreshTokenRouter";

export const authRouter = Router();

authRouter.use("/signup", signupRouter);
authRouter.use("/verify-signup", verifySignupRouter);
authRouter.use("/login", loginRouter);
authRouter.use("/refresh-token", refreshTokenRouter);
