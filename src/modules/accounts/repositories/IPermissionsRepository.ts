import Permission from "../infra/typeorm/entities/Permission";

interface IPermissionsRepository {
  create({ name, description }: ICreatePermissionDTO): Promise<Permission>;
  findById(id: string): Promise<Permission>;
  findByName(name: string): Promise<Permission>;
}

export { IPermissionsRepository };
