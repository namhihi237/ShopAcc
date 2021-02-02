import { verifyToken, HttpError } from "../utils";

const userNameRegex = /^[a-zA-Z0-9_]{3,16}$/;
const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passRegex = /^[A-Za-z0-9/:@!#$^&_+*\(\)\[-`{-~]{6,24}/;
const phoneRegex = /(0)+([0-9]{9})\b/;

const jwtMidleware = async (req, res, next) => {
    try {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
            throw new HttpError("No token, authorization denied", 401);
        }
        try {
            const token = req.headers.authorization.split(" ")[1];
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

export const authMiddleware = {
    jwtMidleware,
};
