import { Router } from "express";
import { itemController } from "../controllers";
import { authMiddleware, validateRequestBody, roleMiddleware } from "../middlewares";

const { jwtMidleware } = authMiddleware;
const { getItems, postItem } = itemController;
// const { postItem } = validateRequestBody;

export const itemRouter = Router();

itemRouter.route("/api/v1/items").get(jwtMidleware, getItems);

itemRouter
    .route("/api/v1/items")
    .post(jwtMidleware, roleMiddleware.postItem, validateRequestBody.postitem, postItem);
