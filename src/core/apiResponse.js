const {StatusCodes} = require("http-status-codes")
class ApiResponse {
  static success(res, message, data = null, statusCode = StatusCodes.OK) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res, message, statusCode = StatusCodes.INTERNAL_SERVER_ERROR) {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}

module.exports = ApiResponse;