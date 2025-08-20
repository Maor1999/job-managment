import jobsData from "./jobsData.js";
import jobModel from "./schemaModel.js";
import sendResponse from "./sendResponse.js";

const seedJobs = async (req, res, next) => {
  try {
    const count = await jobModel.countDocuments();
    if (count === 0) {
      await jobModel.insertMany(jobsData);
      return sendResponse({
        res,
        statusCode: 201,
        message: `Inserted ${jobsData.length} jobs`,
      });
    }
    sendResponse({
      res,
      statusCode: 200,
      message: "Jobs already exist in DB",
    });
  } catch (err) {
    next(err);
  }
};

export default seedJobs;
