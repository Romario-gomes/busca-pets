import { Router } from "express";

import { CreateRoleController } from "@modules/accounts/useCases/createRole/CreateRoleController";

const rolesRoutes = Router();

const createRoleController = new CreateRoleController();

rolesRoutes.post("/", createRoleController.handle);

export { rolesRoutes };
