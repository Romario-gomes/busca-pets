import { Router } from "express";

import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { CreatePetController } from "../../../../modules/pets/useCases/createPet/CreatePetController";
import { DetailsPetController } from "../../../../modules/pets/useCases/detailsPet/DetailsPetController";
import { ListPetsController } from "../../../../modules/pets/useCases/listPets/ListPetController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes };
