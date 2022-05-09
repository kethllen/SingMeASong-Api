import { Router } from "express";
import {testsController} from "../controllers/testsController.js";

const testRouter = Router();

testRouter.delete("/delete", testsController.deleteAll);
testRouter.post("/seed", testsController.seed);
export default testRouter;