import { Router } from "express";
import { itemController } from "../controllers";
import { authMiddleware } from "../middlewares";

const { jwtMidleware } = authMiddleware;
const { getItems, postItem } = itemController;
export const itemRouter = Router();

itemRouter.route("/api/v1/items").get(jwtMidleware, getItems);

itemRouter.route("/api/v1/items").post(jwtMidleware, postItem);
