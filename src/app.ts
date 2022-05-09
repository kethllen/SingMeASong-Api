import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
import recommendationRouter from "../src/routers/recommendationRouter.js";
import testRouter from "../src/routers/testsRouter.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/recommendations", recommendationRouter);
if(process.env.NODE_ENV === "test"){
  app.use("/recommendations", testRouter);
}
app.use(errorHandlerMiddleware);

export default app;
