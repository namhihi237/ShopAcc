import { verifyToken, HttpError } from "../utils";
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

export const authMiddleware = {
    jwtMidleware,
};
