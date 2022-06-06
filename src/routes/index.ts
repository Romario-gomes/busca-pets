import { Router } from "express";
import { petsRoutes } from "./pets.routes";

const router = Router();

router.use("/pets", petsRoutes);

export { router };