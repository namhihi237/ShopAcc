import { Router } from "express";
import { authController } from "../controllers";
import { authMiddleware, validateRequestBody } from "../middlewares";
const { login, register } = authController;

const { createAccountSchema, loginSchema } = validateRequestBody;
export const authRouter = Router();

authRouter.route("/api/v1/auth/register").post(createAccountSchema, register);

authRouter.route("/api/v1/auth/login").post(loginSchema, login);
