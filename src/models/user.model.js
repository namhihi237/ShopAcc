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
    },
    { timestamps: true }
);

export const User = model("user", userSchema, "user");
