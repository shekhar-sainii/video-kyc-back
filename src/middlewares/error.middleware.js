const logger = require("../utils/logger");
const {StatusCodes} = require("http-status-codes")

const errorMiddleware = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    path: req.originalUrl,
    method: req.method,
  });

  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(err.code ? { code: err.code } : {}),
  });
};

module.exports = errorMiddleware;
