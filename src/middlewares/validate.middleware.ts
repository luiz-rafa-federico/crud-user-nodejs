import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
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
