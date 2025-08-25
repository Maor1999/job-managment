import sendResponse from "./sendResponse.js";

const validateObjectId = (req, res, next) => {
  const raw = req.params.id ?? "";
  const id = String(raw).trim();

  const isValid = /^[0-9a-fA-F]{24}$/.test(id);

  if (!isValid) {
    return sendResponse({
      res,
      statusCode: 400,
      message: "Invalid id",
      data: null,
    });
  }

  req.params.id = id; 
  next();
};

export default validateObjectId;
