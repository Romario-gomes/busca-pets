interface ICreateUserDTO {
  name: string;
  password: string;
  username: string;
  email: string;
  id?: string;
  avatar?: string;
}

export { ICreateUserDTO };
