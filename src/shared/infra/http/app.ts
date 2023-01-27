import express from "express";
import "reflect-metadata";

import cors from "cors";

import createConnection from "../typeorm";
import { router } from "./routes";

const app = express();

createConnection();

app.use(cors());

app.use(express.json());

app.use(router);

export { app };
