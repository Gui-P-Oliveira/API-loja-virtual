import { Router } from "express";
import {
  registerUserController,
  userLoginController,
} from "../controllers/userController.js";

const userRouter = new Router();

userRouter.post("/register", registerUserController);

userRouter.post("/login", userLoginController);

export default userRouter;
