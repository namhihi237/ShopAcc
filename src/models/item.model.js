import { Schema, model } from "mongoose";

const itemSchema = new Schema(
    {
        name: {
            type: String,
        },
        price: {
            type: Number,
        },
        info: {
            type: String,
        },
    },
    { timestamps: true }
);

export const Item = model("item", itemSchema, "item");
