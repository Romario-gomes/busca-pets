import { injectable, inject } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import Permission from "../../infra/typeorm/entities/Permission";
import { IPermissionsRepository } from "../../repositories/IPermissionsRepository";

@injectable()
class CreatePermissionUseCase {
  constructor(
    @inject("PermissionsRepository")
    private permissionRepository: IPermissionsRepository,
  ) {}
  async execute({
    name,
    description,
  }: ICreatePermissionDTO): Promise<Permission | AppError> {
    const permissionAlreadyExists = await this.permissionRepository.findByName(
      name,
    );

    if (permissionAlreadyExists) {
      return new AppError("Permissão já existente");
    }

    const permissionCreated = await this.permissionRepository.create({
      name,
      description,
    });

    return permissionCreated;
  }
}

export { CreatePermissionUseCase };
