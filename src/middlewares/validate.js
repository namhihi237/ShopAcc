import Joi from "joi";
import { validateRequest } from "../utils";

const createAccountSchema = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().required().min(3).max(20),
        password: Joi.string().required().min(6).max(50),
        email: Joi.string().email().required(),
        role: Joi.string().valid("shop", "user"),
    });
    validateRequest(req, next, schema);
};

const loginSchema = (req, res, next) => {
    const schema = Joi.object({
        userName: Joi.string().min(3).max(20).empty("").required(),
        password: Joi.string().min(6).max(50).empty("").required(),
    });
    validateRequest(req, next, schema);
};

const postitem = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        info: Joi.string().required(),
    });
    validateRequest(req, next, schema);
};

export const validateRequestBody = { createAccountSchema, loginSchema, postitem };
