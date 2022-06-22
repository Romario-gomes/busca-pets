import { Router } from "express";

import { ListPetsController } from "../../../../modules/pets/useCases/listPets/ListPetsController";

const petsRoutes = Router();

const listPetsController = new ListPetsController();
petsRoutes.get("/", listPetsController.handle);

export { petsRoutes };
