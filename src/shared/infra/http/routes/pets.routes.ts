import { Router } from "express";

import { CreatePetController } from "../../../../modules/pets/useCases/createPet/CreatePetController";
import { ListPetsController } from "../../../../modules/pets/useCases/listPets/ListPetController";

const petsRoutes = Router();

const createPetController = new CreatePetController();
const listPetsController = new ListPetsController();
petsRoutes.post("/", createPetController.handle);
petsRoutes.get("/list", listPetsController.handle);

export { petsRoutes };
