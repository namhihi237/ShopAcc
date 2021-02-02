import { User, Shop, Role } from "../models";
import bcrypt from "bcryptjs";
import { HttpError, tokenEncode } from "../utils";

const register = async (req, res, next) => {
    const { userName, password, email, role } = req.body;

    try {
        const hash = await bcrypt.hash(password, 12);
        if (!hash) {
            throw new HttpError("Try againt", 400);
        }
        const _role = await Role.findOne({ roleName: role });
        if (role === "user") {
            await User.create({ userName, password: hash, email, roleId: _role._id });
        }
        if (role === "shop") {
            await Shop.create({ userName, password: hash, email, roleId: _role._id });
        }
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
    const { userName, password } = req.body;
    try {
        const [user, shop] = await Promise.all([
            User.findOne({ userName }),
            Shop.findOne({ userName }),
        ]);
        const userE = user || shop;
        if (!userE) {
            throw new HttpError("username or password is incorrect", 400);
        }
        const match = await bcrypt.compare(password, userE.password);
        if (!match) {
            throw new HttpError("username or password is incorrect", 400);
        }
        const _role = await Role.findById({ _id: userE.roleId });

        const token = await tokenEncode({ userName, _id: userE._id, roleId: _role._id });
        res.status(200).json({
            status: 200,
            msg: "SignIn success",
            token,
            role: _role.roleName,
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

export const authController = { login, register };
