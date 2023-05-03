import { inject, injectable } from "tsyringe";

import Role from "@modules/accounts/infra/typeorm/entities/Role";
import { IPermissionsRepository } from "@modules/accounts/repositories/IPermissionsRepository";
import { IRolesRepository } from "@modules/accounts/repositories/IRolesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateRoleUseCase {
  constructor(
    @inject("RolesRepository")
    private rolesRepository: IRolesRepository,
    @inject("PermissionsRepository")
    private permissionsRepository: IPermissionsRepository,
  ) {}

  async execute({ name, description, permissions }): Promise<Role | AppError> {
    const roleAlreadyExits = await this.rolesRepository.findByName(name);

    if (roleAlreadyExits) {
      throw new AppError("Roles already Exists");
    }

    const createdRole = await this.rolesRepository.create({
      name,
      description,
      permissions,
    });

    return createdRole;
  }
}

export { CreateRoleUseCase };
