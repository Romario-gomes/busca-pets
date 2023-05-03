import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import Role from "../../infra/typeorm/entities/Role";
import { IPermissionsRepository } from "../../repositories/IPermissionsRepository";
import { IRolesRepository } from "../../repositories/IRolesRepository";

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
