import { Router } from "express";
import * as testController from "../controllers/testsController.js";

const testRouter = Router();

testRouter.delete("/delete", testController.deleteAll);

export default testRouter;