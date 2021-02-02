import { User, Item, Shop } from "../models";

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
    const { name, price, info } = req.body;
    try {
        await Item.create({ name, price, info });
        res.status(200).json({
            status: 200,
            msg: "Add item success",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const itemController = { getItems, postItem };
