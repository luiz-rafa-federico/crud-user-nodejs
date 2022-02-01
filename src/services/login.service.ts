import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/user.repository";
import dotenv from "dotenv";
import { LoginSchema } from "../types/user.types";
import { ErrorHandler } from "../utils/error";

dotenv.config();

export class LoginService {
  async execute(data: LoginSchema) {
    const { email, password } = data;

    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new ErrorHandler(404, "User does not exist");
    } else if (!bcrypt.compareSync(password, user.password)) {
      throw new ErrorHandler(401, "Wrong email/password");
    }

    const { name, uuid } = user;

    const token = jwt.sign(
      { name: name, id: uuid, email: email },
      process.env.SECRET_KEY as string,
      {
        expiresIn: process.env.EXPIRES as string,
      }
    );

    return token;
  }
}
