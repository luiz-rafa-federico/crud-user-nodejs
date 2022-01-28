import { Request, Response, NextFunction } from "express";

import { UserSchemaValidate } from "../types/user.types";

export const validate =
  (schema: UserSchemaValidate) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

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
