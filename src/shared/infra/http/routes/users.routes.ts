import { Router } from "express";

import { ShowUserController } from "@modules/accounts/useCases/showUser/ShowUserController";

import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const showUserController = new ShowUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.get("/me", showUserController.handle);

export { usersRoutes };
