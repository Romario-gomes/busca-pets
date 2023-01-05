import { Router } from "express";

import { CreatePetController } from "../../../../modules/pets/useCases/createPet/CreatePetController";

const petsRoutes = Router();

const createPetController = new CreatePetController();
petsRoutes.post("/", createPetController.handle);

export { petsRoutes };
