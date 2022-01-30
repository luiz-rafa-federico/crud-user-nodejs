import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { ErrorHandler } from "../utils/error";

dotenv.config();

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      (err: any, decoded: any) => {
        if (err) {
          throw new ErrorHandler(401, "Missing authorization headers");
        }

        req.userId = decoded.id;

        next();
      }
    );
  } catch (e) {
    next(e);
  }
};
