import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function deleteAll(req: Request, res: Response) {

  await testService.deleteAll();
  res.sendStatus(200);
}
