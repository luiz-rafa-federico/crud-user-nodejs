import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/user.repository";
import { UserSchema } from "../types/user.types";

dotenv.config();

export const isAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uuid = req.userId;

  const userRepo = getCustomRepository(UsersRepository);

  let user = (await userRepo.findOne(uuid)) as UserSchema;

  if (!user) {
    return res.status(403).json({
      error: "User not found",
    });
  } else if (user.isAdm !== true) {
    return res.status(403).json({
      error: "Unauthorized",
    });
  }

  next();
};
