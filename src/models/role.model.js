import { Schema, model } from "mongoose";

const roleSchema = new Schema(
    {
        roleName: {
            type: String,
            enum: ["admin", "user", "shop"],
        },
    },
    { timestamps: true }
);

export const Role = model("role", roleSchema, "role");
