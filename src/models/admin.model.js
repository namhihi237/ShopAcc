import { Schema, model } from "mongoose";

const adminSchema = new Schema(
    {
        userName: {
            type: String,
        },
        password: {
            type: String,
        },

        roleId: {
            type: Schema.Types.ObjectId,
            ref: "role",
        },
    },
    { timestamps: true }
);

export const Admin = model("admin", adminSchema, "admin");
