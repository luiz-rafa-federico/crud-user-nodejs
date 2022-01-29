import { Request, Response, NextFunction } from "express";
import { UserSchemaValidate, UserType } from "../types/user.types";
import { SchemaOf } from "yup";

export const validate =
  (schema: SchemaOf<UserSchemaValidate>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data: UserType = req.body;

    try {
      const validatedData = await schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      next();
    } catch (e: any) {
      console.error(e);
      res.status(422).json({ [e.name]: e.errors });
    }
  };
