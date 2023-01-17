import { Request, Response } from "express";

class ListPetsController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response.json("Listado Teste");
  }
}

export { ListPetsController };
