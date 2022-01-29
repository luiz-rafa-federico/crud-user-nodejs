import { Request, Response, NextFunction } from "express";
import { UserSchema } from "../types/user.types";
import { SchemaOf } from "yup";

export const validate =
  (schema: SchemaOf<UserSchema>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    try {
      const validatedData = await schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      req.validatedData = validatedData as any;

      next();
    } catch (e: any) {
      console.error(e);
      res.status(422).json({ [e.name]: e.errors });
    }
  };
