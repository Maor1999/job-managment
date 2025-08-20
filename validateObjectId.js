import sendResponse from "./sendResponse.js";
import mongoose from "mongoose";

const validateObjectId = (req, res, next) => {
  const id = req.params.id;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return sendResponse({
      res,
      statusCode: 400,
      message: "Invalid id",
      data: null,
    });
  }
  next();
};
  
  export default validateObjectId