import { Schema, model } from "mongoose";

const shopSchema = new Schema(
    {
        userName: {
            type: String,
        },
        password: {
            type: String,
        },
        email: {
            type: String,
        },
        roleId: {
            type: Schema.Types.ObjectId,
            ref: "role",
        },
    },
    { timestamps: true }
);

export const Shop = model("shop", shopSchema, "shop");
