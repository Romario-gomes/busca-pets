import Permission from "../infra/typeorm/entities/Permission";

interface IPermissionsRepository {
  findById(id: string): Promise<Permission>;
  findByName(name: string): Promise<Permission>;
}

export { IPermissionsRepository };
