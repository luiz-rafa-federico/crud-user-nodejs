import express, { NextFunction, Request, Response } from "express";
import { initializeRouter } from "./routes/routes";
import "reflect-metadata";
import { connectDatabase } from "./database/database";
import { handleError, ErrorHandler } from "./utils/error";

connectDatabase();

const app = express();

app.use(express.json());

app.use(
  (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    handleError(err, res);
  }
);

initializeRouter(app);

export default app;
