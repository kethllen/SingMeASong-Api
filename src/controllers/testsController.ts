import { Request, Response } from "express";
import { testsService } from "../services/testService.js";

async function deleteAll(req: Request, res: Response) {

  await testsService.deleteAll();
  res.sendStatus(200);
}
async function seed(req: Request, res: Response) {

  await testsService.seed(req.body);
  res.sendStatus(200);
}

export const testsController ={
  deleteAll,
  seed
}