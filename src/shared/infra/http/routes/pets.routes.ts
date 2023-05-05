import { Router } from "express";

import { CreatePetController } from "../../../../modules/pets/useCases/createPet/CreatePetController";
import { DetailsPetController } from "../../../../modules/pets/useCases/detailsPet/DetailsPetController";
import { ListPetsController } from "../../../../modules/pets/useCases/listPets/ListPetController";
import {
  ensureAuthenticated,
  ensureAuthorized,
  ensurePermission,
} from "../middlewares/ensureAuthenticated";

const petsRoutes = Router();

const createPetController = new CreatePetController();
const listPetsController = new ListPetsController();
const detailsPetController = new DetailsPetController();

petsRoutes.post("/", createPetController.handle);
petsRoutes.get(
  "/list",
  ensureAuthenticated,
  ensureAuthorized(["ROLE_USER", "manager"]),
  ensurePermission(["view_products"]),
  listPetsController.handle,
);
petsRoutes.get("/:id", detailsPetController.handle);

export { petsRoutes };
