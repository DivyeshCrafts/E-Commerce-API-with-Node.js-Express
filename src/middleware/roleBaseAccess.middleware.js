import {ApiError} from "../utils/apiError.js"

const authorizeRoles = (role) => {
    return (req, _, next) => {
        if (role != req.user.role) {
            return next(new ApiError(403, "You are not authorized to perform this action"));
        }
        next();
    };
};

export {authorizeRoles}