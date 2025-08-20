import sendResponse from "./sendResponse.js";

const handleError = (err ,req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  sendResponse({
    res,
    statusCode,
    message,
    data: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
export default handleError;
