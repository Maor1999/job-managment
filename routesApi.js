import seedJobs from "./seedJobs.js";
import express from "express";
import validateObjectId from "./validateObjectId.js";
import jobModel from "./schemaModel.js";
import sendResponse from "./sendResponse.js";
import asyncHandler from "express-async-handler";
import { zodCreatSchema, validate, updateSchema } from "./zodValidation.js";

const router = express.Router();
console.log("routesApi: router initialized");

const getJobs = asyncHandler(async (_, res) => {
  const jobs = await jobModel
    .find({})
    .lean()
    .select("-__v -createdAt -updatedAt");
  if (!jobs.length) {
    return sendResponse({
      res,
      message: "no jobs found",
      statusCode: 200,
      data: [],
    });
  }
  sendResponse({
    res,
    message: "jobs fetched successfully",
    statusCode: 200,
    data: jobs,
  });
});

const addJob = asyncHandler(async (req, res) => {
  const newData = await jobModel.create(req.validatedBody);

  sendResponse({
    res,
    statusCode: 201,
    message: "job has been added",
    data: newData,
  });
});

const deleteJobById = asyncHandler(async (req, res) => {
  const deletedJob = await jobModel.findByIdAndDelete(req.params.id);
  if (!deletedJob) {
    return sendResponse({
      res,
      message: "job not found",
      statusCode: 404,
      data: null,
    });
  }
  sendResponse({
    res,
    message: "job deleted successfully",
    statusCode: 200,
    data: deletedJob,
  });
});

const fetchJobId = asyncHandler(async (req, res) => {
  const getJob = await jobModel
    .findById(req.params.id)
    .select("-__v -createdAt -updatedAt");
  if (!getJob) {
    return sendResponse({
      res,
      message: "job not found",
      statusCode: 404,
      data: null,
    });
  }
  sendResponse({
    res,
    message: "job fetched successfully",
    statusCode: 200,
    data: getJob,
  });
});

const updateById = asyncHandler(async (req, res) => {
  const updateJob = await jobModel.findByIdAndUpdate(
    req.params.id,
    req.validatedBody,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateJob) {
    return sendResponse({
      res,
      message: "job not found",
      statusCode: 404,
      data: null,
    });
  }
  sendResponse({
    res,
    statusCode: 200,
    message: "job updated successfully",
    data: updateJob,
  });
});

if (process.env.NODE_ENV === "development") {
  router.post("/seed", asyncHandler(seedJobs));
}

console.log("routesApi: defining GET /");
router.route("/").post(validate(zodCreatSchema), addJob).get(getJobs);

router
  .route("/:id")
  .get(validateObjectId, fetchJobId)
  .delete(validateObjectId, deleteJobById)
  .patch(validateObjectId, validate(updateSchema), updateById);

export default router;
