import { z } from "zod";
import sendResponse from './sendResponse.js';

const zodCreatSchema = z.object({
    JobTitle: z.string().trim().min(5, "job title is too short").max(40),
    JobDescription: z.string().trim().min(10, "job description is too short"),
    Location: z.string().trim().min(2, "location too short").max(50),
    JobRequirements: z.string().trim().min(20),
}).strict();

const updateSchema = zodCreatSchema.partial();

const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    
    if (result.success && Object.keys(result.data).length === 0) {
        return sendResponse({
        res,
        statusCode: 400,
        message: "validation failed",
        data: [{ field: "_", message: "request body is empty" }],
    });
    }

    if (!result.success) {
    const issues = result.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
    }));

        return sendResponse({
        res,
        statusCode: 400,
        message: "validation failed",
        data: issues,
    });
    }
    req.validatedBody = result.data;
    next();
}
export { zodCreatSchema, validate, updateSchema };


