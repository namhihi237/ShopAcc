import { verifyToken, HttpError } from "../utils";
import { User } from "../models";

const userNameRegex = /^[a-zA-Z0-9_]{3,16}$/;
const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passRegex = /^[A-Za-z0-9/:@!#$^&_+*\(\)\[-`{-~]{6,24}/;
const phoneRegex = /(0)+([0-9]{9})\b/;

const jwtMidleware = async (req, res, next) => {
    try {
        const token = req.header("token");
        if (!token || token == "null" || token == "" || token == null || token == undefined) {
            throw new HttpError("No token, authorization denied", 401);
        }
        try {
            const decodedToken = verifyToken(token);
            req.user = decodedToken;
            next();
        } catch (e) {
            throw new HttpError("Token is invalid", 400);
        }
    } catch (error) {
        next(error);
    }
};

const registerMiddleware = async (req, res, next) => {
    const { userName, password, email } = req.body;

    try {
        if (!userName || !password || !email) {
            throw new HttpError("data is empty", 400);
        }
        if (!userNameRegex.test(userName)) {
            throw new HttpError("Username is not in the correct format", 400);
        }
        if (!passRegex.test(password)) {
            throw new HttpError(
                "The password cannot contain spaces, and the minimum length is 6 up to 24",
                400
            );
        }
        if (!emailRegexp.test(email)) {
            throw new HttpError("Email is not in the correct format", 400);
        }
        let user = await User.findOne({ email }, { password: 0 });
        if (user) {
            throw new HttpError("Email has been registered by another account", 400);
        }
        user = await User.findOne({ userName }, { password: 0 });

        if (!user) {
            throw new HttpError("username has been registered by another account", 400);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const loginMiddleware = async (req, res, next) => {
    const { userName, password } = req.body;

    try {
        if (!userName || !password) {
            throw new HttpError("data is empty", 400);
        }
        if (!userNameRegex.test(userName)) {
            throw new HttpError("Username is not in the correct format", 400);
        }
        if (!passRegex.test(password)) {
            throw new HttpError(
                "The password cannot contain spaces, and the minimum length is 6 up to 24",
                400
            );
        }

        const user = await User.findOne({ userName });

        if (!user) {
            throw new HttpError("username or password is incorrect", 400);
        }
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export const authMiddleware = {
    jwtMidleware,
    registerMiddleware,
    loginMiddleware,
};
