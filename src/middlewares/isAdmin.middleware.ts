import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/user.repository";
import { UserSchema } from "../types/user.types";
import { ErrorHandler } from "../utils/error";

dotenv.config();

export const isAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uuid = req.userId;

    const userRepo = getCustomRepository(UsersRepository);

    let user = (await userRepo.findOne(uuid)) as UserSchema;

    if (!user) {
      throw new ErrorHandler(403, "User not found");
    } else if (user.isAdm !== true) {
      throw new ErrorHandler(403, "Unauthorized");
    }

    next();
  } catch (e) {
    next(res.json(e));
  }
};
