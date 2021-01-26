import { User } from "../models";
import bcrypt from "bcryptjs";
import { HttpError, tokenEncode } from "../utils";

const register = async (req, res, next) => {
    const { userName, password, email } = req.body;

    try {
        const hashPassword = await bcrypt.hash(password, 12);
        if (!hashPassword) {
            throw new HttpError("Try againt", 400);
        }
        await User.create({ userName, password: hash, email });
        res.status(200).json({
            status: 200,
            msg: "Sign up success",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const login = async (req, res, next) => {
    const user = req.user;
    const { userName, password } = req.body;
    try {
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new HttpError("username or password is incorrect", 400);
        }
        const token = await tokenEncode({ userName, _id: user._id });
        res.status(200).json({
            status: 200,
            msg: "SignIn success",
            token,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const authController = { login, register };
