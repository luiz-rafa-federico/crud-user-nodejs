import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/error";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/user.repository";
import { UserSchema } from "../types/user.types";
import dotenv from "dotenv";

dotenv.config();

export const isUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { uuid } = req.params;

    const token = req.headers.authorization?.split(" ")[1] as string;

    jwt.verify(
      token as string,
      process.env.SECRET_KEY as string,
      async (err: any, decoded: any) => {
        if (err) {
          throw new ErrorHandler(401, "Missing authorization headers");
        }

        let repo = getCustomRepository(UsersRepository);

        let user = (await repo.findOne(uuid)) as UserSchema;

        if (!user) {
          throw new ErrorHandler(403, "User not found");
        } else if (user.uuid !== decoded?.id) {
          throw new ErrorHandler(403, "Unauthorized");
        }

        next();
      }
    );
  } catch (e) {
    next(res.json(e));
  }
};
