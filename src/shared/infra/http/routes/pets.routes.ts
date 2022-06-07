import { Router } from "express";

const petsRoutes = Router();

petsRoutes.get("/", (request, response) => {
  response.send("hello world");
});

export { petsRoutes };
