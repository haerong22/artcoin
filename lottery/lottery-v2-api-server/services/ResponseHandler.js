const _ = require("lodash");

class ResponseHandler {
  static sendSuccess(res, message, status) {
    const funcName = "sendSuceess";
    return (data, globalData) => {
      if (_.isEmpty(status)) status = 200;

      console.log(`[${funcName}] data: `, data);

      res.status(status).json({
        type: "success",
        message: message || "Success result",
        data,
        ...globalData,
      });
    };
  }

  static sendClientError(status, req, res, errorMessage) {
    const funcName = "sendClientError";
    console.error(`[${funcName}]`, errorMessage);
    return res.status(status).json({
      type: "client_issue",
      message: message || "Client issue",
    });
  }

  static sendServerError(req, res, error) {
    const funcName = "sendServerError";
    console.error(`[${funcName}]`, error);
    return res.status(error.status || 500).json({
      type: "server_issue",
      message: error.message || "Server issue",
    });
  }
}

module.exports = ResponseHandler;
