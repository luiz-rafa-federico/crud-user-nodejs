import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/user.repository";
import dotenv from "dotenv";
import { LoginSchema } from "../types/user.types";

dotenv.config();

export class LoginService {
  async execute(data: LoginSchema) {
    const { email, password } = data;

    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new Error("User does not exist");
    } else if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("User email and password missmatch");
    }

    const { name, uuid } = user;

    const token = jwt.sign(
      { name: name, id: uuid, email: email },
      process.env.SECRET_KEY as string,
      {
        expiresIn: process.env.EXPIRES,
      }
    );

    return token;
  }
}
