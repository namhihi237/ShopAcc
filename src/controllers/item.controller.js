import { User, Item } from "../models";

import { HttpError, verifyToken } from "../utils";

const getItems = async (req, res, next) => {
    try {
        const items = await Item.find();
        res.status(200).json({
            status: 200,
            items,
        });
    } catch (error) {
        next(error);
    }
};

const postItem = async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    }
};

export const itemController = { getItems, postItem };
