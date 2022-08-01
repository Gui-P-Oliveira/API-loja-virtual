import { Router } from "express";
import { registerUserController, userLoginController, userLogoffController } from "../controllers/userController.js";

const userRouter = new Router();

userRouter.post("/register", registerUserController);

userRouter.post("/login", userLoginController);

userRouter.post("/logoff", userLogoffController);

export default userRouter;
