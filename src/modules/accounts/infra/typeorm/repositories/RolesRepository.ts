import { Repository, getRepository } from "typeorm";

import { ICreateRoleDTO } from "../../../dtos/ICreateRoleDTO";
import { IRolesRepository } from "../../../repositories/IRolesRepository";
import Role from "../entities/Role";

class RolesRepository implements IRolesRepository {
  private repository: Repository<Role>;

  constructor() {
    this.repository = getRepository(Role);
  }

  async create({
    name,
    description,
    permissions,
  }: ICreateRoleDTO): Promise<Role> {
    const role = this.repository.create({
      name,
      description,
      permission: permissions,
    });

    await this.repository.save(role);

    return role;
  }
  async findByName(name: string): Promise<Role> {
    const role = await this.repository.findOne({ name });

    return role;
  }
  async findById(id: string): Promise<Role> {
    const role = await this.repository.findOne(id);

    return role;
  }

  async findByIds(ids: string[]): Promise<Role[]> {
    const roles = await this.repository.findByIds(ids);

    return roles;
  }
}

export { RolesRepository };
