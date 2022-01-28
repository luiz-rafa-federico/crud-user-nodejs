import express from "express";
import { initializeRouter } from "./routes/routes";
import "reflect-metadata";
import { connectDatabase } from "./database/database";

connectDatabase();

const app = express();

app.use(express.json());

initializeRouter(app);

export default app;
