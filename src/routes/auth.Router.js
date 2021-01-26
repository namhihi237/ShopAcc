import { Router } from "express";
import { authController } from "../controllers";
import { authMiddleware } from "../middlewares";
const { login, register } = authController;
const { registerMiddleware } = authMiddleware;
export const authRouter = Router();

authRouter.route("/api/v1/auth/register").post(registerMiddleware, register);

authRouter.route("/api/v1/auth/login").post(login);
