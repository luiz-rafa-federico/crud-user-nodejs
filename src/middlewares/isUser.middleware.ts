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
  const { uuid } = req.params;
  const id = req.userId;

  const token = req.headers.authorization?.split(" ")[1] as string;

  jwt.verify(
    token as string,
    process.env.SECRET_KEY as string,
    async (err: any, decoded: any) => {
      try {
        if (err) {
          throw new ErrorHandler(401, "Missing authorization headers");
        }

        let repo = getCustomRepository(UsersRepository);

        let userExists = (await repo.findOne(uuid)) as UserSchema;

        if (!userExists) {
          throw new ErrorHandler(403, "User not found");
        } else if (id !== decoded?.id) {
          throw new ErrorHandler(403, "Unauthorized");
        }

        next();
      } catch (e: any) {
        next(e);
      }
    }
  );
};
