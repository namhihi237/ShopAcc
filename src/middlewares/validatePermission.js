import { Permission, Role } from "../models";
import { HttpError } from "../utils";
/* check role - permision user*/

const postItem = async (req, res, next) => {
    const { roleId } = req.user;
    try {
        if (!(await checkRoleAndPer(roleId, "CREATE ITEM"))) {
            throw new HttpError("Denny permission create new item", 403);
        }
        next();
    } catch (error) {
        next(error);
    }
};

const getItems = async (req, res, next) => {
    const { roleId } = req.user;
    try {
        if (!(await checkRoleAndPer(roleId, "GET ITEMS"))) {
            throw new HttpError("Denny permission get items", 403);
        }
        next();
    } catch (error) {
        next(error);
    }
};
/* check role and permission of role*/
const checkRoleAndPer = async (roleId, actionCode) => {
    try {
        const _role = await Role.findById({ _id: roleId });
        if (!_role) {
            console.log("role ko co");
            return false;
        }
        const per = await Permission.findOne({ roleId: _role._id, actionCode });
        if (!per) {
            console.log("per ko co");
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const roleMiddleware = {
    postItem,
    getItems,
};
