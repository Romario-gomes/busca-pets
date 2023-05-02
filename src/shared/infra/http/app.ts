import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
import "express-async-errors";

import cors from "cors";

import { AppError } from "../../errors/AppError";
import createConnection from "../typeorm";
import { router } from "./routes";

const app = express();

createConnection();

app.use(cors());

app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "Error",
      Message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };
