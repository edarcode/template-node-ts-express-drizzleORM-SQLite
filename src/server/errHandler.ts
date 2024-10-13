import { ZodError } from "zod";
import { EdarErr } from "../errors/EdarErr";
import { ErrHandler } from "../types";
import { RouteErr } from "../errors/RouteErr";
import { UnauthorizedErr } from "../errors/UnauthorizedErr";

export const errorHandler: ErrHandler = (error, _req, res, _next) => {
  if (
    error instanceof EdarErr ||
    error instanceof RouteErr ||
    error instanceof UnauthorizedErr
  ) {
    const { status, msg } = error;
    return res.status(status).json({ msg });
  }

  if (error instanceof ZodError) {
    return res.status(400).json(error);
  }

  return res.status(500).json(error);
};
