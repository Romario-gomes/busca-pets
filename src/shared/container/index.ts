import { container } from "tsyringe";

import "./providers";

import { RolesRepository } from "@modules/accounts/infra/typeorm/repositories/RolesRepository";
import { IRolesRepository } from "@modules/accounts/repositories/IRolesRepository";

import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository";
import { PetsRepository } from "../../modules/pets/infra/typeorm/repositories/PetsRepository";
import { IPetsRepository } from "../../modules/pets/repositories/IPetsRepository";

container.registerSingleton<IPetsRepository>("PetsRepository", PetsRepository);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);
container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository,
);

container.registerSingleton<IRolesRepository>(
  "RolesRepository",
  RolesRepository,
);
