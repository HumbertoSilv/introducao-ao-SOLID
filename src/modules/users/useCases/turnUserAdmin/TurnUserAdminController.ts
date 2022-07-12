import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  handle(request: Request, response: Response): Response {
    const { user_id }: any = request.headers;

    const admin = this.turnUserAdminUseCase.execute({ user_id });

    return response.json(admin);
  }
}

export { TurnUserAdminController };
