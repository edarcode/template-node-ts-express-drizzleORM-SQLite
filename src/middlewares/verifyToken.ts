import jwt, { JwtPayload } from "jsonwebtoken";
import { Next, Req, Res } from "../types";
import { JWT } from "../config/jwt";
import { UnauthorizedErr } from "../errors/UnauthorizedErr";

export const verifyToken = ({ role }: Params) => {
  return (req: Req, res: Res, next: Next) => {
    try {
      const token = req.headers.authorization;
      if (!token) throw new UnauthorizedErr();

      jwt.verify(token, JWT.secret as string, (err, decoded) => {
        if (err) throw new UnauthorizedErr(401);

        const tokenPayload = decoded as JwtPayload;
        if (role && tokenPayload?.role !== role) throw new UnauthorizedErr(403);

        res.locals = { ...res.locals, tokenPayload };
        next();
      });
    } catch (error) {
      next(error);
    }
  };
};

type Params = {
  role?: string; // tipar con el role de la db
};
