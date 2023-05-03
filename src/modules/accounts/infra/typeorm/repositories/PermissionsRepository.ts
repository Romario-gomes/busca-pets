import { Repository, getRepository } from "typeorm";

import { IPermissionsRepository } from "../../../repositories/IPermissionsRepository";
import Permission from "../entities/Permission";

class PermissionsRepository implements IPermissionsRepository {
  private repository: Repository<Permission>;

  constructor() {
    this.repository = getRepository(Permission);
  }
  async create({
    name,
    description,
  }: ICreatePermissionDTO): Promise<Permission> {
    const permission = this.repository.create({
      name,
      description,
    });

    await this.repository.save(permission);
    return permission;
  }

  async findById(id: string): Promise<Permission> {
    const permission = await this.repository.findOne(id);

    return permission;
  }
  async findByName(name: string): Promise<Permission> {
    const permission = await this.repository.findOne({ name });
    return permission;
  }
}

export { PermissionsRepository };
