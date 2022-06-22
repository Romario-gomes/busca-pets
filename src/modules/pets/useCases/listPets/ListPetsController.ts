import { Request, Response } from "express";
import { injectable } from "tsyringe";

class ListPetsController {
  async handle(request: Request, response: Response): Promise<Response> {
    return response.json({ message: "Test controller" });
  }
}

export { ListPetsController };
