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
    const currentUserId = req.userId;
    const { uuid } = req.params;

    const userRepo = getCustomRepository(UsersRepository);

    let currentUser = (await userRepo.findOne(currentUserId)) as UserSchema;

    if (currentUser.isAdm !== true && currentUser.uuid !== uuid) {
      throw new ErrorHandler(403, "Missing admin permissions");
    } else if (currentUser.isAdm !== true && currentUser.uuid === uuid) {
      next();
    } else {
      next();
    }
  } catch (e: any) {
    next(e);
  }
};
