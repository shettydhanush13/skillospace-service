const { logger } = require('./logger');

module.exports = {
  errorHandler: (err, req, res, next) => {
    logger.error(`Handled exception in ${req.url} and responded with  ${typeof err === "string" ? err : JSON.stringify(err)}`);
    if (typeof err === "string" || !err) {
      logger.info("err is of type string");
      let status = 500;
      res.status(status).json({
        message: err || "Unknown error",
        error: true,
        status: "error",
      });
    } else {
      let status =
        (err.response && err.response.status) || err.statusCode || 500;
      if (err.message && err.message.indexOf("401") > 0) {
        status = 401;
      }
      if (!err.statusCode) {
        if (err.message && err.message.indexOf("401") > 0) {
          err.statusCode = 401;
        } else err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
      }

      if (res.status) {
        const output = {
          message: err.message,
          error: status === 404 ? false : true,
          status: 'error',
          statusCode: err.statusCode
        }

        if (err.data) output.data = err.data;
        res.status(status).json(output);
      } else res();
    }
  }
};
