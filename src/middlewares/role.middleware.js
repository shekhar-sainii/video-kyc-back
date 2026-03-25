const ApiResponse = require("../core/apiResponse");
const {StatusCodes} = require("http-status-codes")

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return ApiResponse.error(res, "Unauthorized", StatusCodes.UNAUTHORIZED);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return ApiResponse.error(res, "Forbidden - Access denied", StatusCodes.FORBIDDEN);
    }

    next();
  };
};

module.exports = roleMiddleware;