import { Schema, model } from "mongoose";

const userSchema = new Schema(
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

export const User = model("user", userSchema, "user");
