import { ICreateRoleDTO } from "../dtos/ICreateRoleDTO";
import Role from "../infra/typeorm/entities/Role";

interface IRolesRepository {
  create({ name, description, permissions }: ICreateRoleDTO): Promise<Role>;
  findById(id: string): Promise<Role>;
  findByName(name: string): Promise<Role>;
}

export { IRolesRepository };
